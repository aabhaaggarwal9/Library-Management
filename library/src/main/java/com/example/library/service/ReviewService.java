package com.example.library.service;

import org.springframework.data.domain.Page;

import com.example.library.dto.ReviewRequest;
import com.example.library.entity.Book;
import com.example.library.entity.Review;

public interface ReviewService {

	Page<Review> getReviewsByBook(Long bookId, int page, int size);

	String addReview(String username, ReviewRequest reviewRequest);

	Boolean reviewBookByUser(String username, Long bookId);

	void deleteReviewByBook(Book bookId);

}
