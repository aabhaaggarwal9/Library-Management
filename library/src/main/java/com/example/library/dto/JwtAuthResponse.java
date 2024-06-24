package com.example.library.dto;

import lombok.Data;

@Data
public class JwtAuthResponse {
	private String accessToken;
    private String tokenType = "Bearer";
    private String role;

}
