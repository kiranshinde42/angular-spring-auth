package com.sk.dream.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpSSODto {
	@NotBlank (message = "first name should not be null")
    private String firstName;
	@NotBlank (message = "last name should not be null")
    private String lastName;
	@Email (message = "invalid email address")
    private String email;
	private String password;
	private Boolean isSSO = true;
}
