package com.example.library.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LibraryAPIException extends RuntimeException{

	private HttpStatus status;
    private String message;
}
