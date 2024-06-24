package com.example.library.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.library.entity.Book;
import com.example.library.entity.Category;

public interface BookRepository extends JpaRepository<Book, Long>{
	
	Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);
	
	Page<Book> findByCategory(@RequestParam("category") Category category, Pageable pageable);

	List<Book> findByCategory(@RequestParam("category") Category category);
}
