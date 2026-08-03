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
}
