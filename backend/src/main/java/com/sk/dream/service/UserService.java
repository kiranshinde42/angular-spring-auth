package com.sk.dream.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.sk.dream.config.JwtService;
import com.sk.dream.dto.LoginDto;
import com.sk.dream.dto.LoginResponse;
import com.sk.dream.dto.OtpPayload;
import com.sk.dream.dto.RegisterUser;
import com.sk.dream.dto.SignUpDto;
import com.sk.dream.dto.UserList;
import com.sk.dream.entity.Role;
import com.sk.dream.entity.User;
import com.sk.dream.exception.CommonException;
import com.sk.dream.repository.RoleRepository;
import com.sk.dream.repository.UserRepository;

import jakarta.mail.MessagingException;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
    private JwtService jwtService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired 
	private EmailService emailService;
	
	@Autowired
	private UserInfoService userDetailsService;
	
	public User login(LoginDto loginDto) throws CommonException {
		Optional<User> user = userRepository.findByEmailIgnoreCase(loginDto.getEmail());
		if(user.isPresent() && passwordEncoder.matches(loginDto.getPassword(), user.get().getPassword())){
            return user.get();
        } else {
        	throw new CommonException("Email or password wrong!");
        }	
    }
	
	public Optional<User> getUser(String email) {
		return userRepository.findByEmailIgnoreCase(email);
    }
	
	public void registerUser(SignUpDto signUpDto) throws CommonException{
        // checking for email exists in a database
        if(userRepository.existsByEmail(signUpDto.getEmail())){
        	throw new CommonException("Email is already exist!");
        }       
       
        // creating user object
        User user = new User();
        user.setFirstName(signUpDto.getFirstName());
        user.setLastName(signUpDto.getLastName());
        user.setEmail(signUpDto.getEmail());
        user.setIsSSO(false);
        user.setIsActive(true);
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        Set<Role> roleSet = new HashSet<Role>();
        Role role = roleRepository.getByRole("User").get();
        roleSet.add(role);
        user.setRoles(roleSet);
        sendOtp(user);
    }
	
	void sendOtp(User user) throws CommonException{
		try {
        	String OTP = String.valueOf(emailService.generateOneTimePassword());
        	user.setOneTimePassword(OTP);
    	    user.setOtpRequestedTime(new Date());
            userRepository.save(user);
    	    
            // Mail verification
            emailService.sendOTPEmail(user, OTP);
        } catch (Exception e) {
        	throw new CommonException("Something went wrong, Please try again");
		}
	}

	public List<UserList> users() {
		return userRepository.findAll().stream().map(UserList::new).collect(Collectors.toList());
	}
	
	public List<Role> role() {
		return roleRepository.findAll();
	}

	public LoginResponse googleAuthLogin(String idTokenString) throws CommonException {
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
			    // Specify the CLIENT_ID of the app that accesses the backend:
			    .setAudience(Collections.singletonList("844781089585-ps70l23b4rkdidng2f29lv912oa0o613.apps.googleusercontent.com"))
			    // Or, if multiple clients access the backend:
			    //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
			    .build();
		
		GoogleIdToken idToken;
		try {
			idToken = verifier.verify(idTokenString.substring(7));
			if (idToken != null) {
				  Payload payload = idToken.getPayload();
				  String firstName = (String)payload.get("given_name");
				  String lastName = (String)payload.get("family_name");
				  Set<Role> roleSet = new HashSet<Role>();
				  Optional<User> ssoUser = userRepository.findByEmailIgnoreCase(payload.getEmail());
				  if(ssoUser.isEmpty()) {
					  try {
						  User user = new User();
					      user.setFirstName(firstName);
					      user.setLastName(lastName);
					      user.setEmail(payload.getEmail());
					      user.setIsSSO(true);		
					      user.setIsActive(true);
					      Role role = roleRepository.getByRole("User").get();
					      roleSet.add(role);
					      user.setRoles(roleSet);
					      userRepository.save(user);
					  }catch(Exception e) {
						  throw new CommonException("Something went wrong, Unable to create a user");
					  }
				  } else {
					  roleSet = ssoUser.get().getRoles();
				  }
				  
				  // let's create a token
				  String token = jwtService.generateToken(payload.getEmail());
				  LoginResponse lr = new LoginResponse(firstName+" "+lastName, 
		        			token, roleSet.stream().map(role->role.getRole()).collect(Collectors.toList()));
				  return lr;
				} else {
				  System.out.println("Invalid ID token.");
				}
		} catch (GeneralSecurityException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;		
		
	}

	public void addUser(RegisterUser user) {
		// TBD
	}

	public String otpValidate(OtpPayload otpPayload) throws CommonException {
		Optional<User> user = userRepository.findByEmailIgnoreCase(otpPayload.getEmail());		
		if(user.isPresent()) {
			if(!user.get().getIsEmailVerified()) {
				if(emailService.isOTPValid(user.get().getOtpRequestedTime())) {
					if(user.get().getOneTimePassword().equals(otpPayload.getOtp())) {
						user.get().setIsEmailVerified(true);
						userRepository.save(user.get());
						return "Email validated successfully";
					} else {
						throw new CommonException("Invalid OTP");
					}
				} else {
					throw new CommonException("OTP time expired, Please try again!");
				}
			} else {
				throw new CommonException("Email already verified!");
			}
		} else {
			throw new CommonException("Email not register with us!");
		}		
	}

	public String resendOTP(String email) throws CommonException {
		Optional<User> user = userRepository.findByEmailIgnoreCase(email);		
		if(user.isPresent()) {
			if(!user.get().getIsEmailVerified()) {
				this.sendOtp(user.get());
				return "OTP re-sent successfully, Please check email";
			}else {
				throw new CommonException("Email already verified!");
			}
		} else {
			throw new CommonException("Email not register with us!");
		}
	}

	public void isEmailVerified(LoginDto loginDto) throws CommonException {
		Optional<User> user = userRepository.findByEmailIgnoreCase(loginDto.getEmail());		
		if(user.isPresent()) {
			if(!user.get().getIsEmailVerified()) {
				this.sendOtp(user.get());
				throw new CommonException("Please verify the email, Please check email");
			}
		} else {
			throw new CommonException("Email not register with us, Please register!");
		}	
	}

	public String forgotPassword(String email) throws CommonException, UnsupportedEncodingException, MessagingException {
		Optional<User> user = userRepository.findByEmailIgnoreCase(email);		
		if(user.isPresent()) {
			String token = jwtService.generateToken(email);
			final String resetLink = "http://localhost:4200/auth/new-password?token="+ token;
			emailService.sendLinkForForgotPassword(user.get(), resetLink);
			return "Password reset link sent to your email id, Please check email";
		} else {
			throw new CommonException("Email not register with us, Please register!");
		}	
	}

	public String resetPassword(String token, String password) throws CommonException {		
		String username = jwtService.extractUsername(token);		
		UserDetails userDetails = userDetailsService.loadUserByUsername(username);
		if (jwtService.validateToken(token, userDetails)) {
			Optional<User> user = userRepository.findByEmailIgnoreCase(username);		
			if(user.isPresent()) {
				user.get().setPassword(passwordEncoder.encode(password));
				userRepository.save(user.get());
				return "reset password successfully";
			} else {
				throw new CommonException("Email not register with us, Please register!");
			}			
		} else {
			throw new CommonException("Something went wrong, please try again");
		}
	}
}
