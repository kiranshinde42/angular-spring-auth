package com.sk.dream.dto;

import org.hibernate.validator.constraints.Range;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpPayload {
	@Email (message = "invalid email address")
	String email;
	String otp;
}
