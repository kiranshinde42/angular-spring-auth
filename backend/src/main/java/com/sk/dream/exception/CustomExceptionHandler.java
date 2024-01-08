package com.sk.dream.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;

@RestControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ProblemDetail handleSecurityException(Exception ex) {
		ProblemDetail errorDetail = null;
		if (ex instanceof BadCredentialsException) {
			errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), ex.getMessage());
			errorDetail.setProperty("access_denied_reason", "Authentication Failure");
		}

		if (ex instanceof AccessDeniedException) {
			errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
			errorDetail.setProperty("access_denied_reason", "not_authorized!");
		}

		if (ex instanceof SignatureException) {
			errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
			errorDetail.setProperty("access_denied_reason", "JWT Signature not valid");
		}
		
		if (ex instanceof ExpiredJwtException) {
			errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), ex.getMessage());
			errorDetail.setProperty("access_denied_reason", "Session Expired!");
		}

		return errorDetail;
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException exception) {
		Map<String, String> map = new HashMap<>();
		exception.getBindingResult().getFieldErrors().forEach(fieldError -> {
			map.put(fieldError.getField(), fieldError.getDefaultMessage());
		});
		return map;
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(CommonException.class)
	public Map<String, String> handleUserNotFoundException(CommonException exception) {
		Map<String, String> map = new HashMap<>();
		map.put("errorMessage", exception.getMessage());
		return map;
	}
}
