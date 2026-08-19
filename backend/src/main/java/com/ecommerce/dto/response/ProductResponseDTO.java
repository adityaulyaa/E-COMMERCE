package com.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDTO {

    private Long productId;
    private String name;
    private String description;
    private String shortDescription;
    private BigDecimal price;
    private Integer stock;
    private String category;
    private List<String> imageUrls;
    private BigDecimal rating;
    private Long reviewCount;
    private Integer soldCount;
}
