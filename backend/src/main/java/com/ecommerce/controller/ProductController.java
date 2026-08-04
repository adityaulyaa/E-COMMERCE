package com.ecommerce.controller;

import com.ecommerce.dto.request.FilterRequestDTO;
import com.ecommerce.dto.response.ProductListDTO;
import com.ecommerce.dto.response.ProductResponseDTO;
import com.ecommerce.service.ProductService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
@Validated
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ProductListDTO> getAllProducts() {
        log.info("Received GET /products request");

        List<ProductResponseDTO> products = productService.getAllProducts();

        ProductListDTO response = ProductListDTO.builder()
                .products(products)
                .build();

        log.info("Returning {} products", products.size());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/search")
    public ResponseEntity<ProductListDTO> searchProducts(
            @RequestParam("keyword") @NotBlank String keyword) {
        log.info("Received GET /products/search request with keyword: {}", keyword);

        List<ProductResponseDTO> products = productService.searchProducts(keyword);

        ProductListDTO response = ProductListDTO.builder()
                .products(products)
                .build();

        log.info("Returning {} products matching keyword: {}", products.size(), keyword);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // UC-06: Filter Products
    @GetMapping("/filter")
    public ResponseEntity<ProductListDTO> filterProducts(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(value = "maxPrice", required = false) BigDecimal maxPrice,
            @RequestParam(value = "minRating", required = false) BigDecimal minRating,
            @RequestParam(value = "sortBy", required = false) String sortBy) {
        
        log.info("Received GET /products/filter request - category: {}, minPrice: {}, maxPrice: {}, minRating: {}, sortBy: {}", 
                 category, minPrice, maxPrice, minRating, sortBy);

        FilterRequestDTO filterRequest = FilterRequestDTO.builder()
                .category(category)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .minRating(minRating)
                .sortBy(sortBy)
                .build();

        List<ProductResponseDTO> products = productService.filterProducts(filterRequest);

        ProductListDTO response = ProductListDTO.builder()
                .products(products)
                .build();

        log.info("Returning {} filtered products", products.size());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
