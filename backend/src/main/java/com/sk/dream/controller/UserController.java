package com.sk.dream.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sk.dream.config.JwtService;
import com.sk.dream.dto.LoginDto;
import com.sk.dream.dto.LoginResponse;
import com.sk.dream.dto.SignUpDto;
import com.sk.dream.dto.UserList;
import com.sk.dream.entity.User;
import com.sk.dream.exception.CommonException;
import com.sk.dream.service.UserService;

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
		LoginResponse token = this.authenticateAndGetToken(loginDto);
		return new ResponseEntity<>(token, HttpStatus.OK);
    }
	
	@PostMapping("/auth/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody SignUpDto signUpDto) throws CommonException{
		userService.registerUser(signUpDto);
        return new ResponseEntity<>("User is registered successfully!", HttpStatus.OK);
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
	
	public LoginResponse authenticateAndGetToken(LoginDto authRequest) throws CommonException { 
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
    } 
}
