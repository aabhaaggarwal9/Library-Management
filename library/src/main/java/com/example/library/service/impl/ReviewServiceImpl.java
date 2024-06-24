package com.example.library.service.impl;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.library.dao.BookRepository;
import com.example.library.dao.ReviewRepository;
import com.example.library.dto.ReviewRequest;
import com.example.library.entity.Book;
import com.example.library.entity.Review;
import com.example.library.exception.LibraryAPIException;
import com.example.library.exception.ResourceNotFoundException;
import com.example.library.service.ReviewService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService{
	
	private ReviewRepository reviewRepository;
	
	private BookRepository bookRepository;
	
	@Override
	public Page<Review> getReviewsByBook(Long bookId, int page, int size) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found with id:" + bookId));
		return reviewRepository.findByBookId(book, PageRequest.of(page, size));
	}

	@Override
	public String addReview(String username, ReviewRequest reviewRequest) {
		Book book = bookRepository.findById(reviewRequest.getBookId()).orElseThrow(() -> new ResourceNotFoundException("Book not found with id:" + reviewRequest.getBookId()));
		Review reviewExist = reviewRepository.findByBookIdAndUsername(book, username);
		if(reviewExist != null) {
			throw new LibraryAPIException(HttpStatus.FOUND,"Review already exist");
		}
		Review review = new Review();
		review.setBookId(book);
		review.setDate(LocalDate.now());
		review.setRating(reviewRequest.getRating());
		review.setReviewDescription(reviewRequest.getReviewDescription());
		review.setUsername(username);
		
		reviewRepository.save(review);
		return "Review added successfully";
	}

	@Override
	public Boolean reviewBookByUser(String username, Long bookId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found with id:" + bookId));
		Review reviewExist = reviewRepository.findByBookIdAndUsername(book, username);
		if(reviewExist!= null) {
			return true;
		}
		return false;
	}

	@Override
	public void deleteReviewByBook(Book bookId) {
		reviewRepository.deleteByBookId(bookId);
		
	}

}
