package com.example.library.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.library.entity.Book;
import com.example.library.entity.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long>{
	
	@Query("SELECT COUNT(c) FROM Checkout c WHERE c.username = :username")
    Long countByUsername(@Param("username") String username);

	Checkout findByUsernameAndBook(String username, Book book);

	List<Checkout> findByUsername(String username);

	void deleteByBook(@RequestParam("book") Book book);
	
	List<Checkout> findByBook(@RequestParam Book book);

}
