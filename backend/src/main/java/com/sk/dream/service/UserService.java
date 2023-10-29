package com.sk.dream.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sk.dream.dto.LoginDto;
import com.sk.dream.dto.SignUpDto;
import com.sk.dream.entity.User;
import com.sk.dream.exception.CommonException;
import com.sk.dream.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
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
        userRepository.save(user);
    }

	public List<User> users() {
		return userRepository.findAll();
	}
}
