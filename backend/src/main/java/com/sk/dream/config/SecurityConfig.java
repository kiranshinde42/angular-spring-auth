package com.sk.dream.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.sk.dream.filter.JwtAuthFilter;
import com.sk.dream.service.UserInfoService;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
    private JwtAuthFilter authFilter; 
  
    // User Creation 
    @Bean
    public UserDetailsService userDetailsService() { 
        return new UserInfoService(); 
    }
	
	@Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			// by default uses a Bean by the name of corsConfigurationSource
			.cors(cors -> cors.disable()).csrf((csrf) -> csrf.disable())
			.authorizeHttpRequests((authorizeRequests) ->
				authorizeRequests
					.requestMatchers(HttpMethod.OPTIONS, "**").permitAll()
					.requestMatchers("/api/auth/**").permitAll()
					.requestMatchers("/api/auth/authorize").permitAll()
					.requestMatchers("/api/admin/**").hasAuthority("Admin")
					.requestMatchers("/api/user/**").hasAuthority("Admin")
					.requestMatchers("/api/user/**").hasAuthority("User")
					.requestMatchers("/api/**").authenticated())
			 .sessionManagement((session) -> session
			            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			 .authenticationProvider(authenticationProvider()) 
             .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
	
	@Bean
    public PasswordEncoder passwordEncoder() { 
        return new BCryptPasswordEncoder(); 
    } 
	
	@Bean
    public AuthenticationProvider authenticationProvider() { 
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(); 
        authenticationProvider.setUserDetailsService(userDetailsService()); 
        authenticationProvider.setPasswordEncoder(passwordEncoder()); 
        return authenticationProvider; 
    }
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception { 
        return config.getAuthenticationManager(); 
    } 
}
