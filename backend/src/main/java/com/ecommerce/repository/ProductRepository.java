package com.ecommerce.repository;

import com.ecommerce.entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String nameKeyword, String descriptionKeyword);
            
    List<Product> findAllByOrderByCreatedAtDesc();
    
    // UC-06: Combined filter with sorting
    @Query("SELECT p FROM Product p LEFT JOIN Review r ON r.product.productId = p.productId " +
           "GROUP BY p.productId HAVING " +
           "(:keyword IS NULL OR (LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))) AND " +
           "(:category IS NULL OR LOWER(p.category) = LOWER(:category)) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:minRating IS NULL OR COALESCE(AVG(r.rating), 0) >= :minRating)")
    List<Product> filterProductsWithSorting(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minRating") BigDecimal minRating,
            Sort sort
    );
}
