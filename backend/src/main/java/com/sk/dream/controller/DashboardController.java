package com.sk.dream.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sk.dream.entity.Menu;
import com.sk.dream.service.DashboardService;

@RestController
@RequestMapping("/api")
public class DashboardController {
	Logger logger = LoggerFactory.getLogger(DashboardController.class);
	
	@Autowired
	DashboardService dashboardService;
	
	@GetMapping("/dashboard/menu")
    public ResponseEntity<List<Menu>> authLogin(@RequestHeader("Authorization") String token) {
		List<Menu> menu = dashboardService.getMenus(token);		
		return new ResponseEntity<>(menu, HttpStatus.OK);
    }
}
