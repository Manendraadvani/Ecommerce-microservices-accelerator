package com.springbootmicroservices.productservice.service;

import com.springbootmicroservices.productservice.model.product.entity.ProductEntity;
import com.springbootmicroservices.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for searching products.
 */
@Service
@RequiredArgsConstructor
public class ProductSearchService {

    private final ProductRepository productRepository;

    /**
     * Search products by query string.
     * Searches across name, author, category, and publisher fields.
     *
     * @param query the search query
     * @return list of matching products
     */
    public List<ProductEntity> searchProducts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return productRepository.findAll();
        }
        return productRepository.searchProducts(query.trim());
    }

    /**
     * Search products by name.
     *
     * @param name the product name to search
     * @return list of matching products
     */
    public List<ProductEntity> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    /**
     * Search products by author name.
     *
     * @param authorName the author name to search
     * @return list of matching products
     */
    public List<ProductEntity> searchByAuthor(String authorName) {
        return productRepository.findByAuthorNameContainingIgnoreCase(authorName);
    }
}