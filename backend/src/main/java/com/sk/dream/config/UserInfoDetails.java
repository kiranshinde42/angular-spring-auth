package com.sk.dream.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sk.dream.entity.Role;
import com.sk.dream.entity.User;

public class UserInfoDetails implements UserDetails { 
  
    /**
	 * 
	 */
	private static final long serialVersionUID = 1227135444927430580L;
	private String name; 
    private String password; 
    private List<GrantedAuthority> authorities; 
  
    public UserInfoDetails(User userInfo) { 
        name = userInfo.getEmail(); 
        password = userInfo.getPassword();
        List<String> roles = new ArrayList<>();
        for(Role r : userInfo.getRoles()) {
        	roles.add(r.getRole());
		}
        authorities = roles.stream().map(SimpleGrantedAuthority::new) 
                .collect(Collectors.toList()); 
    } 
  
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { 
        return authorities; 
    } 
  
    @Override
    public String getPassword() { 
        return password; 
    } 
  
    @Override
    public String getUsername() { 
        return name; 
    } 
  
    @Override
    public boolean isAccountNonExpired() { 
        return true; 
    } 
  
    @Override
    public boolean isAccountNonLocked() { 
        return true; 
    } 
  
    @Override
    public boolean isCredentialsNonExpired() { 
        return true; 
    } 
  
    @Override
    public boolean isEnabled() { 
        return true; 
    } 
} 
