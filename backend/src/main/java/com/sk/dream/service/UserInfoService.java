package com.sk.dream.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sk.dream.config.UserInfoDetails;
import com.sk.dream.entity.User;
import com.sk.dream.repository.UserRepository;

@Service
public class UserInfoService implements UserDetailsService {
	
	@Autowired
    private UserRepository repository; 
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userDetail = repository.findByEmail(username);
        System.out.println("userDetail "+ userDetail.get().getRoles());
        UserDetails userDetails = userDetail.map(UserInfoDetails::new) 
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
       
        return userDetails;
    } 
}
