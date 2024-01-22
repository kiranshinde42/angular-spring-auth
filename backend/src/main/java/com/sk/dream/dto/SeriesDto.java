package com.sk.dream.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeriesDto {
	@NotBlank (message = "Series name should not be null")
    private String series;
	
	private Long noOfTeams;
}
