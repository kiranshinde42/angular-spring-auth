package com.sk.dream.exception;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.servlet.HandlerExceptionResolver;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	private HandlerExceptionResolver er;	
	
	public CustomAuthenticationEntryPoint(HandlerExceptionResolver exceptionResolver) {
		this.er = exceptionResolver;
	}

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        er.resolveException(request, response, null, exception);
    }
}
