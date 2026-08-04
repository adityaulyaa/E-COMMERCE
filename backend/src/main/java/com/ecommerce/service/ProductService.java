package com.ecommerce.service;

import com.ecommerce.dto.request.FilterRequestDTO;
import com.ecommerce.dto.response.ProductResponseDTO;
import com.ecommerce.entity.Product;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getAllProducts() {
        log.info("Fetching all products from database");

        List<Product> products = productRepository.findAll();
        
        log.info("Found {} products", products.size());

        return productMapper.toResponseDTOList(products);
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> searchProducts(String keyword) {
        log.info("Searching products with keyword: {}", keyword);

        if (keyword == null || keyword.trim().isEmpty()) {
            log.warn("Search keyword is null or empty");
            return List.of();
        }

        String trimmedKeyword = keyword.trim();
        
        List<Product> products = productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        trimmedKeyword, trimmedKeyword);
        
        log.info("Found {} products matching keyword: {}", products.size(), trimmedKeyword);

        return productMapper.toResponseDTOList(products);
    }

    // UC-06: Filter Products
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> filterProducts(FilterRequestDTO filterRequest) {
        log.info("Filtering products with criteria: {}", filterRequest);

        // Validate filter criteria
        validateFilterCriteria(filterRequest);

        String category = filterRequest.getCategory();
        BigDecimal minPrice = filterRequest.getMinPrice();
        BigDecimal maxPrice = filterRequest.getMaxPrice();
        BigDecimal minRating = filterRequest.getMinRating();
        String sortBy = filterRequest.getSortBy() != null ? filterRequest.getSortBy() : "featured";

        // Normalize category (handle "All Categories" or empty)
        if (category != null && (category.equalsIgnoreCase("All Categories") || category.trim().isEmpty())) {
            category = null;
        }

        List<Product> products;

        // If no filters applied, return all products
        if (category == null && minPrice == null && maxPrice == null && minRating == null) {
            log.info("No filters applied, fetching all products");
            products = productRepository.findAll();
        } else {
            // Apply filters using repository query
            log.info("Applying filters - category: {}, minPrice: {}, maxPrice: {}, minRating: {}, sortBy: {}", 
                     category, minPrice, maxPrice, minRating, sortBy);
            
            products = productRepository.filterProductsWithSorting(
                    category, minPrice, maxPrice, minRating, sortBy);
        }

        // Apply sorting if needed (for featured and mostPurchased which aren't in DB)
        products = applySorting(products, sortBy);

        log.info("Found {} products after filtering", products.size());

        return productMapper.toResponseDTOList(products);
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

    private List<Product> applySorting(List<Product> products, String sortBy) {
        if (sortBy == null || sortBy.isEmpty() || sortBy.equalsIgnoreCase("featured")) {
            // Featured: sort by rating DESC, then by name
            return products.stream()
                    .sorted(Comparator.comparing(Product::getRating).reversed()
                            .thenComparing(Product::getName))
                    .toList();
        }

        // For mostPurchased, we don't have purchase data, so treat as featured
        if (sortBy.equalsIgnoreCase("mostPurchased")) {
            log.warn("mostPurchased sorting requested but no purchase data available, using featured instead");
            return products.stream()
                    .sorted(Comparator.comparing(Product::getRating).reversed()
                            .thenComparing(Product::getName))
                    .toList();
        }

        // Other sorting is already handled by repository query
        return products;
    }
}
