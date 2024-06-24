package com.example.library.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.library.dao.BookRepository;
import com.example.library.dao.CategoryRepository;
import com.example.library.dao.CheckoutRepository;
import com.example.library.entity.Book;
import com.example.library.entity.Category;
import com.example.library.entity.Checkout;
import com.example.library.exception.LibraryAPIException;
import com.example.library.exception.ResourceNotFoundException;
import com.example.library.service.BookService;
import com.example.library.service.CheckoutService;
import com.example.library.service.HistoryService;
import com.example.library.service.ReviewService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService{
	
	private BookRepository bookRepository;
	private CategoryRepository categoryRepository;
	private CheckoutRepository checkoutRepository;
	private ReviewService reviewService;
	private CheckoutService checkoutService;
	private HistoryService historyService;

	@Override
	public Book getBook(Long bookId) {
		Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id:" + bookId));
		return book;
	}

	@Override
	public Page<Book> getAllBooks(int page, int size) {
		return bookRepository.findAll(PageRequest.of(page, size));
	}

	@Override
	public Page<Book> getBooksByCategory(Long categoryId, int page, int size) {
		Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id:" + categoryId));
		return bookRepository.findByCategory(category, PageRequest.of(page, size));
	}

	@Override
	public Page<Book> getBooksByTitle(String title, int page, int size) {
		return bookRepository.findByTitleContaining(title, PageRequest.of(page, size));
	}

	@Override
	public Book addBook(Book book) {
		Book savedBook = bookRepository.save(book);
		return savedBook;
	}

	@Override
	public String deleteBook(Long bookId) {
		Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id:" + bookId));
		List<Checkout> checkouts = checkoutRepository.findByBook(book);
		if(!checkouts.isEmpty()) {
			throw new LibraryAPIException(HttpStatus.BAD_REQUEST, "Book is checked out! It can't be deleted.");
		}
		reviewService.deleteReviewByBook(book);
		checkoutService.deleteCheckoutByBook(book);
		historyService.deleteHistoryByBook(book);
		bookRepository.delete(book);
		return "Book deleted successfully";
	}

}
