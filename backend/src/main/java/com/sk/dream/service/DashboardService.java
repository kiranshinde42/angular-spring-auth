package com.sk.dream.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sk.dream.config.JwtService;
import com.sk.dream.entity.Menu;
import com.sk.dream.entity.User;
import com.sk.dream.repository.RoleMenuRepository;

@Service
public class DashboardService {
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	RoleMenuRepository roleMenuRepository;

	public List<Menu> getMenus(String token) {
		User user = userService.getUser(jwtService.extractUsername(token.substring(7))).get();
		List<Long> roleIds = user.getRoles().stream().map(roles->roles.getRoleId()).collect(Collectors.toList());		
		List<Menu> menu = roleMenuRepository.findAll().stream().filter(f-> roleIds.contains(f.getRole().getRoleId())).map(m->m.getMenu()).collect(Collectors.toList());
		return menu.stream().distinct().collect(Collectors.toList());
	}

}
