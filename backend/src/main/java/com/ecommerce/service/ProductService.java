package com.ecommerce.service;

import com.ecommerce.dto.response.ProductResponseDTO;
import com.ecommerce.entity.Product;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
