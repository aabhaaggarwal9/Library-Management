package com.example.library.service;

import com.example.library.dto.JwtAuthResponse;
import com.example.library.dto.LoginDto;
import com.example.library.entity.User;

public interface AuthService {
	
	String register(User user);

	JwtAuthResponse login(LoginDto loginDto);

}
