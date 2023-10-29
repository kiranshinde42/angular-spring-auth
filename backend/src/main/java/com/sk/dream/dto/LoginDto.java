package com.sk.dream.dto;

import org.hibernate.validator.constraints.Range;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {	
	@Email (message = "invalid email address")
    private String email;
	@Range(min= 6, max= 60, message = "min 6 and max 60 character required for password")
    private String password;
}
