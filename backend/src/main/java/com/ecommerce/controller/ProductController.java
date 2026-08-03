package com.ecommerce.controller;

import com.ecommerce.dto.response.ProductListDTO;
import com.ecommerce.dto.response.ProductResponseDTO;
import com.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
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
}
