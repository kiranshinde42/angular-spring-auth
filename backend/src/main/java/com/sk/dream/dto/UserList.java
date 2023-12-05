package com.sk.dream.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.sk.dream.entity.User;

import lombok.Data;

@Data
public class UserList {
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;
    
    public UserList(User user){
    	this.email = user.getEmail();
    	this.firstName = user.getFirstName();
    	this.lastName = user.getLastName();
    	this.roles = user.getRoles().stream().map(roles -> roles.getRole()).collect(Collectors.toList());
    }
}
