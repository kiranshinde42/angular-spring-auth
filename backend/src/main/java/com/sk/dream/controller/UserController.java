package com.sk.dream.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sk.dream.dto.SignUpDto;
import com.sk.dream.entity.User;
import com.sk.dream.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody SignUpDto signUpDto) {
		if(userRepository.existsByEmailAndPassword(signUpDto.getEmail(), signUpDto.getPassword())){
            return new ResponseEntity<>("Successfully login!", HttpStatus.OK);
        }  else {
        	return new ResponseEntity<>("Email or password wrong!", HttpStatus.BAD_REQUEST);
        }		
    }
	
	@PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody SignUpDto signUpDto){
        // checking for email exists in a database
        if(userRepository.existsByEmail(signUpDto.getEmail())){
            return new ResponseEntity<>("Email is already exist!", HttpStatus.BAD_REQUEST);
        }
        // creating user object
        User user = new User();
        user.setFirstName(signUpDto.getFirstName());
        user.setLastName(signUpDto.getLastName());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(signUpDto.getPassword());
        userRepository.save(user);
        return new ResponseEntity<>("User is registered successfully!", HttpStatus.OK);
    }
}
