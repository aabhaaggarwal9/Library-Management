package com.example.library.dto;

import lombok.Data;

@Data
public class ReviewRequest {
	
	private Long bookId;
	private double rating;
	private String reviewDescription;

}
