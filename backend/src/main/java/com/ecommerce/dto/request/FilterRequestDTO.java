package com.ecommerce.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FilterRequestDTO {

    private String category;
    private String keyword; // For search keyword

    @DecimalMin(value = "0.0", message = "Minimum price must be greater than or equal to 0")
    private BigDecimal minPrice;

    @DecimalMin(value = "0.0", message = "Maximum price must be greater than or equal to 0")
    private BigDecimal maxPrice;

    @DecimalMin(value = "0.0", message = "Minimum rating must be between 0 and 5")
    @Max(value = 5, message = "Minimum rating must be between 0 and 5")
    private BigDecimal minRating;

    private String sortBy; // featured, latest, mostPurchased, price_asc, price_desc, rating
}
