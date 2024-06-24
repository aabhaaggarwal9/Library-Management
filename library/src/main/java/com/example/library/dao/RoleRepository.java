package com.example.library.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	
	 Role findByName(String name);

}
