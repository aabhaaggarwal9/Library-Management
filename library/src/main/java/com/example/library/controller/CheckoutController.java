package com.example.library.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.library.entity.Checkout;
import com.example.library.security.JwtTokenProvider;
import com.example.library.service.CheckoutService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("api/checkout")
@AllArgsConstructor
public class CheckoutController {
	
	private CheckoutService checkoutService;
	
	private JwtTokenProvider jwtTokenProvider;
	
	@GetMapping("loanCountByUsername")
	public ResponseEntity<Long> getLoanCountByUsername(@RequestHeader("Authorization") String token){
		String username = jwtTokenProvider.getUsername(token);
		Long count = checkoutService.getLoanCountByUsername(username);
		return new ResponseEntity<>(count, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<String> addCheckout(@RequestHeader("Authorization") String token,@RequestParam Long bookId){
		String username = jwtTokenProvider.getUsername(token);
		String response = checkoutService.addCheckout(username, bookId);
		return new ResponseEntity<>(response,HttpStatus.OK);	
	}
	
	@GetMapping("isBookCheckout")
	public ResponseEntity<Boolean> isBookCheckout(@RequestHeader("Authorization") String token,@RequestParam Long bookId){
		String username = jwtTokenProvider.getUsername(token);
		Boolean response = checkoutService.isBookCheckout(username, bookId);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("loansByUsername")
	public ResponseEntity<List<Checkout>> getLoansByUsername(@RequestHeader("Authorization") String token){
		String username = jwtTokenProvider.getUsername(token);
		List<Checkout> checkouts = checkoutService.getLoansByUsername(username);
		return new ResponseEntity<>(checkouts, HttpStatus.OK);
	}

	@DeleteMapping
	public ResponseEntity<String> returnBook(@RequestHeader("Authorization") String token,@RequestParam Long checkoutId){
		String username = jwtTokenProvider.getUsername(token);
		String response = checkoutService.returnBook(username, checkoutId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Checkout> renewLoan(@RequestHeader("Authorization") String token,@RequestParam Long checkoutId){
		String username = jwtTokenProvider.getUsername(token);
		Checkout checkout = checkoutService.renewLoan(username, checkoutId);
		return new ResponseEntity<>(checkout, HttpStatus.OK);
	}
}
