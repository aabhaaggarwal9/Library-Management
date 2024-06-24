package com.example.library.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.library.entity.Book;
import com.example.library.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
	
	Page<Review> findByBookId(@RequestParam("bookId") Book bookId, Pageable pageable);
	Review findByBookIdAndUsername(@RequestParam("bookId") Book bookId, @RequestParam("username") String username);
	void deleteByBookId(@RequestParam("bookId") Book bookId);

}
