package com.example.library.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.library.entity.Book;
import com.example.library.service.BookService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("api/books")
@AllArgsConstructor
public class BookController {
	
	private BookService bookService;
	
	@GetMapping("{id}")
		public ResponseEntity<Book> getBook(@PathVariable("id") Long bookId){
		Book book = bookService.getBook(bookId);
        return new ResponseEntity<>(book, HttpStatus.OK);
		}
	
	 @GetMapping
	    public ResponseEntity<Page<Book>> getAllBooks(@RequestParam(defaultValue = "0") int page,
	            @RequestParam(defaultValue = "20") int size){
	        Page<Book> books = bookService.getAllBooks(page, size);
	        return new ResponseEntity<>(books, HttpStatus.OK);
	    }
	 
	 @GetMapping("search/findByCategory")
	    public ResponseEntity<Page<Book>> getBooksByCategory(@RequestParam Long categoryId, @RequestParam(defaultValue = "0") int page,
	            @RequestParam(defaultValue = "20") int size){
	        Page<Book> books = bookService.getBooksByCategory(categoryId, page, size);
	        return new ResponseEntity<>(books, HttpStatus.OK);
	 }
	
	 @GetMapping("search/findByTitle")
	    public ResponseEntity<Page<Book>> getBooksByTitle(@RequestParam String title, @RequestParam(defaultValue = "0") int page,
	            @RequestParam(defaultValue = "20") int size){
	        Page<Book> books = bookService.getBooksByTitle(title, page, size);
	        return new ResponseEntity<>(books, HttpStatus.OK);
	 }
	
	 @PostMapping
	 public ResponseEntity<Book> addBook(@RequestBody Book book){
		 Book savedBook = bookService.addBook(book);
		 return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
	 }
	
	 @PutMapping
	 public ResponseEntity<Book> updateBook(@RequestBody Book book){
		 Book updatedBook = bookService.addBook(book);
		 return new ResponseEntity<>(updatedBook, HttpStatus.OK);
	 }
	 
	 @DeleteMapping
	 public ResponseEntity<String> deleteBook(@RequestParam Long bookId){
		 String response = bookService.deleteBook(bookId);
		 return new ResponseEntity<>(response, HttpStatus.OK);
	 }
}

