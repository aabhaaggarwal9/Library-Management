package com.example.library.service;

import java.util.List;

import com.example.library.entity.Category;

public interface CategoryService {

	List<Category> getAllCategories();

	Category addCategory(String categoryName);

	Category updateCategory(Category category);

	String deleteCategory(Long categoryId);

}
