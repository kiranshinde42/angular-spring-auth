package com.sk.dream.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sk.dream.entity.RoleMenu;

@Repository
public interface RoleMenuRepository extends JpaRepository<RoleMenu, Long>{
}
