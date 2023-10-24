package com.sk.dream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DreamApplication {

	public static void main(String[] args) {
		SpringApplication.run(DreamApplication.class, args);
	}
}
