package com.sk.dream.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class WebConfig extends WebMvcConfigurationSupport {
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
           .allowedMethods("*");
    }
}