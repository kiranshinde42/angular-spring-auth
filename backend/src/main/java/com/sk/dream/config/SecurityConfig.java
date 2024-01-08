package com.sk.dream.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.sk.dream.exception.CustomAccessDeniedHandle;
import com.sk.dream.exception.CustomAuthenticationEntryPoint;
import com.sk.dream.filter.JwtAuthFilter;
import com.sk.dream.service.UserInfoService;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	
	@Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver exceptionResolver;

    // User Creation 
    @Bean
    UserDetailsService userDetailsService() { 
        return new UserInfoService(); 
    }

    @Bean
    JwtAuthFilter jwtAuthFilter() {
    	return new JwtAuthFilter(exceptionResolver);
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
			// defining exception handling
            .exceptionHandling((exception) -> 
            	exception
            		.accessDeniedHandler(new CustomAccessDeniedHandle(exceptionResolver))
            		.authenticationEntryPoint(new CustomAuthenticationEntryPoint(exceptionResolver)))
			 .sessionManagement((session) -> session
			            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			 .authenticationProvider(authenticationProvider()) 
             .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

    @Bean
    PasswordEncoder passwordEncoder() { 
        return new BCryptPasswordEncoder(); 
    }

    @Bean
    AuthenticationProvider authenticationProvider() { 
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(); 
        authenticationProvider.setUserDetailsService(userDetailsService()); 
        authenticationProvider.setPasswordEncoder(passwordEncoder()); 
        return authenticationProvider; 
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception { 
        return config.getAuthenticationManager(); 
    } 
}
