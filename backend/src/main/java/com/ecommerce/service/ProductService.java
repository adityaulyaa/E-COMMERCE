package com.ecommerce.service;

import com.ecommerce.dto.request.FilterRequestDTO;
import com.ecommerce.dto.response.ProductResponseDTO;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.ProductNotFoundException;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> filterProducts(FilterRequestDTO filterRequest) {
        log.info("Filtering products with criteria: {}", filterRequest);

        // Validate filter criteria
        validateFilterCriteria(filterRequest);

        String keyword = filterRequest.getKeyword();
        String category = filterRequest.getCategory();
        BigDecimal minPrice = filterRequest.getMinPrice();
        BigDecimal maxPrice = filterRequest.getMaxPrice();
        BigDecimal minRating = filterRequest.getMinRating();
        String sortBy = filterRequest.getSortBy() != null ? filterRequest.getSortBy() : "latest";

        // Normalize category (handle "All Categories" or empty)
        if (category != null && (category.equalsIgnoreCase("All Categories") || category.trim().isEmpty())) {
            category = null;
        }

        Sort sort = createSort(sortBy);

        List<Product> products;

        // If no filters, no keyword, and sorting by latest, return all sorted by created date
        if (keyword == null && category == null && minPrice == null && maxPrice == null && minRating == null && sortBy.equals("latest")) {
            log.info("No filters, keyword, or specific sort applied (using default latest), fetching all products sorted by latest");
            products = productRepository.findAll(sort); // Use findAll with sort
        } else {
            // Apply filters (including keyword) using repository query
            log.info("Applying filters - keyword: {}, category: {}, minPrice: {}, maxPrice: {}, minRating: {}, sortBy: {}", 
                     keyword, category, minPrice, maxPrice, minRating, sortBy);
            
            products = productRepository.filterProductsWithSorting(
                    keyword,
                    category,
                    minPrice,
                    maxPrice,
                    minRating,
                    sort); // Pass Sort object
        }

        log.info("Found {} products after filtering", products.size());

        // Fetch dynamic ratings for all filtered products
        List<Long> productIds = products.stream().map(Product::getProductId).collect(Collectors.toList());
        Map<Long, Object[]> ratingStatsMap = Map.of();
        if (!productIds.isEmpty()) {
            List<Object[]> ratingStats = reviewRepository.findRatingStatsByProductIds(productIds);
            ratingStatsMap = ratingStats.stream()
                    .collect(Collectors.toMap(
                            arr -> (Long) arr[0],
                            arr -> arr
                    ));
        }

        return productMapper.toResponseDTOList(products, ratingStatsMap);
    }

    private void validateFilterCriteria(FilterRequestDTO filterRequest) {
        BigDecimal minPrice = filterRequest.getMinPrice();
        BigDecimal maxPrice = filterRequest.getMaxPrice();

        // Validate price range
        if (minPrice != null && maxPrice != null) {
            if (minPrice.compareTo(maxPrice) > 0) {
                log.error("Invalid price range: minPrice {} is greater than maxPrice {}", minPrice, maxPrice);
                throw new IllegalArgumentException("Minimum price cannot be greater than maximum price");
            }
        }

        // Validate minPrice >= 0
        if (minPrice != null && minPrice.compareTo(BigDecimal.ZERO) < 0) {
            log.error("Invalid minPrice: {}", minPrice);
            throw new IllegalArgumentException("Minimum price must be greater than or equal to 0");
        }

        // Validate maxPrice >= 0
        if (maxPrice != null && maxPrice.compareTo(BigDecimal.ZERO) < 0) {
            log.error("Invalid maxPrice: {}", maxPrice);
            throw new IllegalArgumentException("Maximum price must be greater than or equal to 0");
        }

        // Validate rating range (0-5)
        BigDecimal minRating = filterRequest.getMinRating();
        if (minRating != null) {
            if (minRating.compareTo(BigDecimal.ZERO) < 0 || minRating.compareTo(BigDecimal.valueOf(5)) > 0) {
                log.error("Invalid rating: {}", minRating);
                throw new IllegalArgumentException("Rating must be between 0 and 5");
            }
        }
    }

    private Sort createSort(String sortBy) {
        switch (sortBy) {
            case "price_asc":
                return Sort.by(Sort.Direction.ASC, "price");
            case "price_desc":
                return Sort.by(Sort.Direction.DESC, "price");
            case "rating":
                return Sort.by(Sort.Direction.DESC, "rating");
            case "mostPurchased":
                return Sort.by(Sort.Direction.DESC, "soldCount");
            case "latest":
                return Sort.by(Sort.Direction.DESC, "createdAt");
            default:
                return Sort.by(Sort.Direction.DESC, "createdAt");
        }
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO getProductDetail(Long productId) {
        log.info("Fetching product detail for ID: {}", productId);

        if (productId == null || productId <= 0) {
            log.error("Invalid product ID: {}", productId);
            throw new IllegalArgumentException("Product ID must be a positive number");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> {
                    log.error("Product not found with ID: {}", productId);
                    return new ProductNotFoundException(productId);
                });

        // Dynamic calculation of rating and review count
        Double averageRating = reviewRepository.findAverageRatingByProductId(productId);
        Long reviewCount = reviewRepository.countByProductProductId(productId);

        log.info("Successfully retrieved product: {}, rating: {}, reviews: {}", 
                 product.getName(), averageRating, reviewCount);
        
        return productMapper.toResponseDTO(product, averageRating, reviewCount);
    }
}
