package com.ecommerce.mapper;

import com.ecommerce.dto.response.ProductResponseDTO;
import com.ecommerce.entity.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public ProductResponseDTO toResponseDTO(Product product) {
        if (product == null) {
            return null;
        }

        return ProductResponseDTO.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .category(product.getCategory())
                .imageUrl(product.getImageUrl())
                .rating(product.getRating())
                .build();
    }

    public List<ProductResponseDTO> toResponseDTOList(List<Product> products) {
        if (products == null || products.isEmpty()) {
            return List.of();
        }

        return products.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }
}
