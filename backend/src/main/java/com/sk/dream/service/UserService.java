package com.sk.dream.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.sk.dream.config.JwtService;
import com.sk.dream.dto.LoginDto;
import com.sk.dream.dto.LoginResponse;
import com.sk.dream.dto.SignUpDto;
import com.sk.dream.dto.SignUpSSODto;
import com.sk.dream.dto.UserList;
import com.sk.dream.entity.Role;
import com.sk.dream.entity.User;
import com.sk.dream.exception.CommonException;
import com.sk.dream.repository.RoleRepository;
import com.sk.dream.repository.UserRepository;

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
	
	public User login(LoginDto loginDto) throws CommonException {
		Optional<User> user = userRepository.findByEmail(loginDto.getEmail());
		if(user.isPresent() && passwordEncoder.matches(loginDto.getPassword(), user.get().getPassword())){
            return user.get();
        } else {
        	throw new CommonException("Email or password wrong!");
        }	
    }
	
	public Optional<User> getUser(String email) {
		return userRepository.findByEmail(email);
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
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        Set<Role> roleSet = new HashSet<Role>();
        Role role = roleRepository.getByRole("User").get();
        roleSet.add(role);
        user.setRoles(roleSet);
        userRepository.save(user);
    }
	
	public void registerSSOUser(SignUpSSODto signUpDto) throws CommonException{
        // checking for email exists in a database
        if(userRepository.existsByEmail(signUpDto.getEmail())){
        	throw new CommonException("Email is already exist!");
        }
        // creating user object
        User user = new User();
        user.setFirstName(signUpDto.getFirstName());
        user.setLastName(signUpDto.getLastName());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        Set<Role> roleSet = new HashSet<Role>();
        Role role = roleRepository.getByRole("User").get();
        roleSet.add(role);
        user.setRoles(roleSet);
        userRepository.save(user);
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
			idToken = verifier.verify(idTokenString);
			if (idToken != null) {
				  Payload payload = idToken.getPayload();
				  String firstName = (String)payload.get("given_name");
				  String lastName = (String)payload.get("family_name");
				  Set<Role> roleSet = new HashSet<Role>();
				  if(!userRepository.existsByEmail(payload.getEmail())) {
					  try {
						  User user = new User();
					      user.setFirstName(firstName);
					      user.setLastName(lastName);
					      user.setEmail(payload.getEmail());
					      user.setIsSSO(true);					      
					      Role role = roleRepository.getByRole("User").get();
					      roleSet.add(role);
					      user.setRoles(roleSet);
					      userRepository.save(user);
					  }catch(Exception e) {
						  throw new CommonException("Something went wrong, Unable to create a user");
					  }
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
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;		
		
	}
}
