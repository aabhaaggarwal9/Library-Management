package com.example.library.service.impl;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.library.dao.BookRepository;
import com.example.library.dao.CheckoutRepository;
import com.example.library.entity.Book;
import com.example.library.entity.Checkout;
import com.example.library.exception.LibraryAPIException;
import com.example.library.exception.ResourceNotFoundException;
import com.example.library.service.CheckoutService;
import com.example.library.service.HistoryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CheckoutServiceImpl implements CheckoutService{
	
	private CheckoutRepository checkoutRepository;
	
	private BookRepository bookRepository;
	
	private HistoryService historyService;
	
	@Override
	public Long getLoanCountByUsername(String username) {
		Long count = checkoutRepository.countByUsername(username);
		return count;
	}

	@Override
	public String addCheckout(String username, Long bookId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found with id:" + bookId));
		if(book.getCopiesAvailable() <= 0) {
			throw new LibraryAPIException(HttpStatus.NO_CONTENT,"Books are not available");
		}
		Long loanCount = getLoanCountByUsername(username);
		if(loanCount >= 5) {
			throw new LibraryAPIException(HttpStatus.NOT_ACCEPTABLE, "Loan count limit reached");
		}
		Checkout checkout = new Checkout();
		checkout.setCheckoutDate(LocalDate.now());
		checkout.setReturnDate(LocalDate.now().plusDays(7));
		checkout.setUsername(username);
		
		checkout.setBook(book);
		book.setCopiesAvailable(book.getCopiesAvailable()-1);
		
		bookRepository.save(book);
		checkoutRepository.save(checkout);
		return "Book checked out successfully";
	}

	@Override
	public Boolean isBookCheckout(String username, Long bookId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found with id:" + bookId));
		Checkout checkout = checkoutRepository.findByUsernameAndBook(username,book);
		if(checkout != null) {
			return true;
		}
		return false;
	}

	@Override
	public List<Checkout> getLoansByUsername(String username) {
		List<Checkout> checkouts = checkoutRepository.findByUsername(username);
		return checkouts;
	}

	@Override
	public String returnBook(String username, Long checkoutId) {
		Checkout checkout = checkoutRepository.findById(checkoutId).orElseThrow(() -> new ResourceNotFoundException("Loan not found with id:"+checkoutId));
		if(!checkout.getUsername().equals(username)) {
			throw new ResourceNotFoundException("This loan doesn't belong to username:"+username);
		}
		Book book = checkout.getBook();
		book.setCopiesAvailable(book.getCopiesAvailable()+1);
		bookRepository.save(book);
		
		String response = historyService.addHistory(username, checkout.getCheckoutDate(), book);
		
		checkoutRepository.delete(checkout);
		
		return response;
	}

	@Override
	public Checkout renewLoan(String username, Long checkoutId) {
		Checkout checkout = checkoutRepository.findById(checkoutId).orElseThrow(() -> new ResourceNotFoundException("Loan not found with id:"+checkoutId));
		if(!checkout.getUsername().equals(username)) {
			throw new ResourceNotFoundException("This loan doesn't belong to username:"+username);
		}
		if(!checkout.getReturnDate().equals(LocalDate.now())) {
			throw new LibraryAPIException(HttpStatus.BAD_REQUEST, "Return date has not come or passed away");
		}
        Period period = Period.between(checkout.getCheckoutDate(), checkout.getReturnDate());
        if(period.getDays() >= 7) {
        	throw new LibraryAPIException(HttpStatus.BAD_REQUEST, "Loan is already renewed once");
        }
		checkout.setReturnDate(LocalDate.now().plusDays(7));
		Checkout renewedCheckout = checkoutRepository.save(checkout);
		return renewedCheckout;
	}

	@Override
	public void deleteCheckoutByBook(Book book) {
		checkoutRepository.deleteByBook(book);
		
	}

}