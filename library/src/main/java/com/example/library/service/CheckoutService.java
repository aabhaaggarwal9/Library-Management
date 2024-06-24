package com.example.library.service;

import java.util.List;

import com.example.library.entity.Book;
import com.example.library.entity.Checkout;

public interface CheckoutService {

	Long getLoanCountByUsername(String username);

	String addCheckout(String username, Long bookId);

	Boolean isBookCheckout(String username, Long bookId);

	List<Checkout> getLoansByUsername(String username);

	String returnBook(String username, Long checkoutId);

	Checkout renewLoan(String username, Long checkoutId);

	void deleteCheckoutByBook(Book book);

}
