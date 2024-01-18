package com.sk.dream.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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
@Table(name = "role_menu")
public class RoleMenu {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleMenuId;
	
	@ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    Role role;

    @ManyToOne
    @MapsId("menuId")
    @JoinColumn(name = "menu_id")
    Menu menu;

}
