package org.example.Angular.servies;

import org.example.Angular.entities.Category;
import org.example.Angular.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories(){
        return this.categoryRepository.findAll();
    }

    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }

    public Category updateCategory(Category category){
        return categoryRepository.save(category);
    }

    public void deleteCategory(Category category){
        categoryRepository.delete(category);
    }
}