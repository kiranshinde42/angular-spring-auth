package com.sk.dream.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sk.dream.config.JwtService;
import com.sk.dream.dto.LoginDto;
import com.sk.dream.dto.LoginResponse;
import com.sk.dream.dto.OtpPayload;
import com.sk.dream.dto.RegisterUser;
import com.sk.dream.dto.SignUpDto;
import com.sk.dream.dto.UserList;
import com.sk.dream.entity.User;
import com.sk.dream.exception.CommonException;
import com.sk.dream.service.UserService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {
	Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;
  
    @Autowired
    private JwtService jwtService; 
  
    @Autowired
    private AuthenticationManager authenticationManager; 
	
	@PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDto loginDto) throws CommonException {
		// Is email verified
		userService.isEmailVerified(loginDto);
		
		LoginResponse token = this.authenticateAndGetToken(loginDto);
		return new ResponseEntity<>(token, HttpStatus.OK);
    }
	
	@PostMapping("/auth/register")
    public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody SignUpDto signUpDto) throws CommonException{
		userService.registerUser(signUpDto);
		Map<String, String> response = new HashMap<String, String>();
		response.put("message", "User is registered successfully!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
	
	@PostMapping("/auth/otp/validate")
    public ResponseEntity<Map<String, String>> otpValidate(@Valid @RequestBody OtpPayload otpPayload) throws CommonException{
		Map<String, String> response = new HashMap<String, String>();
		response.put("message", userService.otpValidate(otpPayload));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
	
	@GetMapping("/auth/otp/resend")
    public ResponseEntity<Map<String, String>> resendOTP(@RequestParam("email") String email) throws CommonException{
		Map<String, String> response = new HashMap<String, String>();
		response.put("message", userService.resendOTP(email));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
	
	@GetMapping("/admin/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestHeader("email") String email) throws CommonException, UnsupportedEncodingException, MessagingException{
		Map<String, String> res = new HashMap<String, String>();
		res.put("message", userService.forgotPassword(email));
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
	
	@GetMapping("/auth/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestHeader("token") String token, @RequestHeader("password") String password) throws CommonException, UnsupportedEncodingException, MessagingException{
		Map<String, String> response = new HashMap<String, String>();
		response.put("message", userService.resetPassword(token, password));
        return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/auth/authorize")
    public ResponseEntity<LoginResponse> authLogin(@RequestHeader("idToken") String token) throws CommonException{
		LoginResponse lr = userService.googleAuthLogin(token);		
		return new ResponseEntity<>(lr, HttpStatus.OK);
    }	
	
	@GetMapping("/admin/users")
    public ResponseEntity<List<UserList>> users(){
		logger.info("/users - Get all user");
		List<UserList> users = userService.users();
		return new ResponseEntity<>(users, HttpStatus.OK);
    }
	
	@PostMapping("/admin/user")
    public ResponseEntity<List<UserList>> addUser(@Valid @RequestBody RegisterUser user){
		System.out.println("User controller");
//		logger.info("/Add a user");
		userService.addUser(user);
		List<UserList> users = userService.users();
		return new ResponseEntity<>(users, HttpStatus.OK);
    }
	
	public LoginResponse authenticateAndGetToken(LoginDto authRequest) throws CommonException { 
        try {
        	Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())); 
            if (authentication.isAuthenticated()) { 
            	String token = jwtService.generateToken(authRequest.getEmail());
            	User user = userService.getUser(authRequest.getEmail()).get();
            	List<String> roleList = user.getRoles().stream().map(roles->roles.getRole()).collect(Collectors.toList());
            	LoginResponse lr = new LoginResponse(user.getFirstName()+" "+user.getLastName(), 
            			token, roleList);
                return  lr;
            } else { 
                throw new UsernameNotFoundException("invalid user request !"); 
            } 
        }catch (Exception e) {
        	throw new BadCredentialsException("Bad Credentials !");
		}		
    }
}
