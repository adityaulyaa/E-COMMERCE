package com.ecommerce.repository;

import com.ecommerce.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    /**
     * Find all reviews for a given product, sorted by creation date descending.
     * @param productId The ID of the product.
     * @return A list of reviews.
     */
    List<Review> findByProductProductIdOrderByCreatedAtDesc(Long productId);

    /**
     * Calculate the average rating for a given product.
     * @param productId The ID of the product.
     * @return The average rating, or null if no reviews exist.
     */
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.productId = :productId")
    Double findAverageRatingByProductId(@Param("productId") Long productId);

    /**
     * Count the number of reviews for a given product.
     * @param productId The ID of the product.
     * @return The total number of reviews.
     */
    @Query("SELECT COUNT(r) FROM Review r WHERE r.product.productId = :productId")
    Long countByProductProductId(@Param("productId") Long productId);

    /**
     * Get rating stats (Average and Count) for multiple products.
     * Returns a list of arrays where: [0] = Long productId, [1] = Double avgRating, [2] = Long reviewCount
     */
    @Query("SELECT r.product.productId, AVG(r.rating), COUNT(r) " +
           "FROM Review r WHERE r.product.productId IN :productIds " +
           "GROUP BY r.product.productId")
    List<Object[]> findRatingStatsByProductIds(@Param("productIds") List<Long> productIds);
}