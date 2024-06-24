package com.example.library.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.library.dto.ReviewRequest;
import com.example.library.entity.Review;
import com.example.library.security.JwtTokenProvider;
import com.example.library.service.ReviewService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("api/reviews")
@AllArgsConstructor
public class ReviewController {
	
	private ReviewService reviewService;
	
	private JwtTokenProvider jwtTokenProvider;
	
	@GetMapping("findByBook")
	public ResponseEntity<Page<Review>> getReviewsByBook(@RequestParam Long bookId, @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size){
		Page<Review> reviews = reviewService.getReviewsByBook(bookId, page, size);
		return new ResponseEntity<>(reviews, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<String> addReview(@RequestHeader("Authorization") String token, @RequestBody ReviewRequest reviewRequest){
		String username = jwtTokenProvider.getUsername(token);
		String response = reviewService.addReview(username, reviewRequest);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("reviewBookByUser")
	public ResponseEntity<Boolean> reviewBookByUser(@RequestHeader("Authorization") String token, @RequestParam Long bookId){
		String username = jwtTokenProvider.getUsername(token);
		Boolean response = reviewService.reviewBookByUser(username, bookId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
