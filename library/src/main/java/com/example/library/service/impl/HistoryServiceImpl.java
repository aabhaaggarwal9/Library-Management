package com.example.library.service.impl;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.library.dao.HistoryRepository;
import com.example.library.entity.Book;
import com.example.library.entity.History;
import com.example.library.service.HistoryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HistoryServiceImpl implements HistoryService{
	
	private HistoryRepository historyRepository;

	@Override
	public String addHistory(String username, LocalDate checkoutDate, Book book) {
		History history = new History();
		history.setUsername(username);
		history.setCheckoutDate(checkoutDate);
		history.setReturnedDate(LocalDate.now());
		history.setBook(book);
		historyRepository.save(history);
		return "Book Returned successfully";
	}

	@Override
	public Page<History> getHistoryByUsername(String username, int page, int size) {
		Page<History> history = historyRepository.findByUsername(username, PageRequest.of(page, size));
		return history;
	}

	@Override
	public void deleteHistoryByBook(Book book) {
		historyRepository.deleteByBook(book);
		
	}

}
