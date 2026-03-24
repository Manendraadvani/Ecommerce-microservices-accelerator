// com.springbootmicroservices.productservice.repository.ProductRepository
package com.springbootmicroservices.productservice.repository;

import com.springbootmicroservices.productservice.model.product.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, String>, JpaSpecificationExecutor<ProductEntity> {
    
    // Existing methods - KEEP THESE
    boolean existsProductEntityByName(final String name);
    boolean existsProductEntityByNameAndIdNot(String name, String id);
    List<ProductEntity> findByCategory(String category);
    Optional<ProductEntity> findByNameAndIdNot(String name, String id);

    // NEW: Search functionality (updated - removed publisher if it doesn't exist)
    @Query("SELECT p FROM ProductEntity p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.authorName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<ProductEntity> searchProducts(@Param("query") String query);
    
    // NEW: Additional search methods (optional but useful)
    List<ProductEntity> findByNameContainingIgnoreCase(String name);
    List<ProductEntity> findByAuthorNameContainingIgnoreCase(String authorName);
}