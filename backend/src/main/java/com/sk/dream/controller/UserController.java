package com.sk.dream.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sk.dream.dto.LoginDto;
import com.sk.dream.dto.SignUpDto;
import com.sk.dream.entity.User;
import com.sk.dream.exception.CommonException;
import com.sk.dream.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginDto loginDto) throws CommonException {
		User user = userService.login(loginDto);
		return new ResponseEntity<>(user, HttpStatus.OK);
    }
	
	@PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody SignUpDto signUpDto) throws CommonException{
		userService.registerUser(signUpDto);
        return new ResponseEntity<>("User is registered successfully!", HttpStatus.OK);
    }
	
	@GetMapping("/users")
    public ResponseEntity<List<User>> users(){
		List<User> users = userService.users();
		return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
