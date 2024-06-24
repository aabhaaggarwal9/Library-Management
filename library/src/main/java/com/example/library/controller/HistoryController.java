package com.example.library.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.library.entity.History;
import com.example.library.security.JwtTokenProvider;
import com.example.library.service.HistoryService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("api/history")
@AllArgsConstructor
public class HistoryController {
	
	private HistoryService historyService;
	
	private JwtTokenProvider jwtTokenProvider;
	
	@GetMapping("/historyByUsername")
	public ResponseEntity<Page<History>> getHistoryByUsername(@RequestHeader("Authorization") String token,@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size){
		String username = jwtTokenProvider.getUsername(token);
		Page<History> history = historyService.getHistoryByUsername(username, page, size);
		return new ResponseEntity<>(history, HttpStatus.OK);
	}

}
