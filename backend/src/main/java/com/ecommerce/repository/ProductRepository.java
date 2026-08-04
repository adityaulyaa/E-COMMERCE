package com.ecommerce.repository;

import com.ecommerce.entity.Product;
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
    
    // UC-06: Filter by category
    List<Product> findByCategory(String category);
    
    // UC-06: Filter by price range
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    // UC-06: Filter by rating (minimum rating)
    List<Product> findByRatingGreaterThanEqual(BigDecimal minRating);
    
    // UC-06: Combined filter with all criteria (using @Query for flexibility)
    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR LOWER(p.category) = LOWER(:category)) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:minRating IS NULL OR p.rating >= :minRating)")
    List<Product> filterProducts(
            @Param("category") String category,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minRating") BigDecimal minRating
    );
    
    // UC-06: Combined filter with sorting
    @Query("SELECT p FROM Product p WHERE " +
           "(:category IS NULL OR LOWER(p.category) = LOWER(:category)) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:minRating IS NULL OR p.rating >= :minRating) " +
           "ORDER BY " +
           "CASE WHEN :sortBy = 'latest' THEN p.createdAt END DESC, " +
           "CASE WHEN :sortBy = 'price_asc' THEN p.price END ASC, " +
           "CASE WHEN :sortBy = 'price_desc' THEN p.price END DESC, " +
           "CASE WHEN :sortBy = 'rating' THEN p.rating END DESC, " +
           "p.productId ASC")
    List<Product> filterProductsWithSorting(
            @Param("category") String category,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minRating") BigDecimal minRating,
            @Param("sortBy") String sortBy
    );
}
