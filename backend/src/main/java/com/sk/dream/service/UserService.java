package com.sk.dream.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sk.dream.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
}
