package com.example.library.service.impl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.library.dao.BookRepository;
import com.example.library.dao.CategoryRepository;
import com.example.library.entity.Book;
import com.example.library.entity.Category;
import com.example.library.exception.LibraryAPIException;
import com.example.library.exception.ResourceNotFoundException;
import com.example.library.service.CategoryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService{
	
	private CategoryRepository categoryRepository;
	private BookRepository bookRepository;
	
	@Override
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}

	@Override
	public Category addCategory(String categoryName) {
		Category category = new Category();
		category.setName(categoryName);
		Category savedCategory = categoryRepository.save(category);
		return savedCategory;
	}

	@Override
	public Category updateCategory(Category category) {
		Category updatedCategory = categoryRepository.save(category);
		return updatedCategory;
	}

	@Override
	public String deleteCategory(Long categoryId) {
		Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id:" + categoryId));
		List<Book> books = bookRepository.findByCategory(category);
		if(!books.isEmpty()) {
			throw new LibraryAPIException(HttpStatus.CONFLICT,"Books are present with Category:"+ category.getName());
		}
		categoryRepository.delete(category);
		return "Category deleted successfully";
	}

}
