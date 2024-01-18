package com.sk.dream.entity;

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
@Table(name = "menu")
public class Menu {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;
	
	@Column(nullable = false)
    private String title;
	
	@Column(nullable = false)
    private String icon;
	
	@Column(nullable = false)
    private String path;
	
	@Column(nullable = false)
    private String color;
	
	@Column(nullable = false)
    private String subTitle;
	
	@Column(nullable = false)
    private String subIcon;
	
	@Column(nullable = false)
    private String subLink;
	
	@Column(nullable = false)
    private String subColor;
}
