package com.example.library.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.library.entity.Category;
import com.example.library.service.CategoryService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("api/categories")
@AllArgsConstructor
public class CategoryController {
	
private CategoryService categoryService;
	
	@GetMapping
		public ResponseEntity<List<Category>> getAllCategories(){
		List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
		}
	
	@PostMapping
	public ResponseEntity<Category> addCategory(@RequestParam String categoryName){
		Category category = categoryService.addCategory(categoryName);
		return new ResponseEntity<>(category, HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<Category> updateCategory(@RequestBody Category category){
		Category updatedCategory = categoryService.updateCategory(category);
		return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<String> deleteCategory(@RequestParam Long categoryId){
		String response = categoryService.deleteCategory(categoryId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
