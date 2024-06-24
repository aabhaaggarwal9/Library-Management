package com.example.library.service;

import org.springframework.data.domain.Page;

import com.example.library.entity.Book;


public interface BookService {

	Book getBook(Long bookId);

	Page<Book> getAllBooks(int page,int size);

	Page<Book> getBooksByCategory(Long categoryId, int page, int size);

	Page<Book> getBooksByTitle(String title, int page, int size);

	Book addBook(Book book);

	String deleteBook(Long bookId);

}
