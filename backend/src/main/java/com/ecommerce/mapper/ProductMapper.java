package com.ecommerce.mapper;

import com.ecommerce.dto.response.ProductResponseDTO;
import com.ecommerce.entity.Product;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public ProductResponseDTO toResponseDTO(Product product, Double averageRating, Long reviewCount) {
        if (product == null) {
            return null;
        }

        List<String> imageUrls = product.getImages() == null ? List.of() :
            product.getImages().stream()
                .map(img -> img.getImageUrl())
                .collect(Collectors.toList());

        return ProductResponseDTO.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .category(product.getCategory())
                .imageUrls(imageUrls)
                .rating(averageRating != null ? BigDecimal.valueOf(averageRating) : BigDecimal.ZERO)
                .reviewCount(reviewCount != null ? reviewCount : 0L)
                .soldCount(product.getSoldCount())
                .build();
    }

    // Overload for cases where rating and reviewCount are not yet calculated
    public ProductResponseDTO toResponseDTO(Product product) {
        return toResponseDTO(product, null, null);
    }

    public List<ProductResponseDTO> toResponseDTOList(List<Product> products) {
        if (products == null || products.isEmpty()) {
            return List.of();
        }

        return products.stream()
                .map(this::toResponseDTO) // Uses the overloaded method
                .collect(Collectors.toList());
    }

    public List<ProductResponseDTO> toResponseDTOList(List<Product> products, Map<Long, Object[]> ratingStatsMap) {
        if (products == null || products.isEmpty()) {
            return List.of();
        }

        return products.stream()
                .map(product -> {
                    Object[] stats = ratingStatsMap.get(product.getProductId());
                    Double avgRating = null;
                    Long reviewCount = null;
                    if (stats != null) {
                        avgRating = (Double) stats[1];
                        reviewCount = (Long) stats[2];
                    }
                    return toResponseDTO(product, avgRating, reviewCount);
                })
                .collect(Collectors.toList());
    }
}

