package com.example.library.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.library.entity.Book;
import com.example.library.entity.History;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long>{

	Page<History> findByUsername(@RequestParam String username, Pageable pageable);

	void deleteByBook(@RequestParam("book") Book book);
	
}
