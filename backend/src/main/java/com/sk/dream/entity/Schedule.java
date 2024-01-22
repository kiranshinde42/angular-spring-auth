package com.sk.dream.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "schedule")
public class Schedule {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;
	
	@Column(length = 45)
    private String series;	
	
    private Long noOfTeams;
    
    private Date startDate = new Date();
}
