package com.sk.dream.exception;

import java.io.IOException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAccessDeniedHandle implements AccessDeniedHandler {
	
	private HandlerExceptionResolver er;	
	
	public CustomAccessDeniedHandle(HandlerExceptionResolver exceptionResolver) {
		this.er = exceptionResolver;
	}
	
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exc) throws IOException, ServletException {    	
    	er.resolveException(request, response, null, exc);
    }
}
