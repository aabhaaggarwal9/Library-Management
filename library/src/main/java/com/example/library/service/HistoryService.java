package com.example.library.service;

import java.time.LocalDate;

import org.springframework.data.domain.Page;

import com.example.library.entity.Book;
import com.example.library.entity.History;

public interface HistoryService {

	String addHistory(String username, LocalDate checkoutDate, Book book);

	Page<History> getHistoryByUsername(String username, int page, int size);

	void deleteHistoryByBook(Book book);

}
