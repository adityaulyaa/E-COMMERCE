package com.ecommerce.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Update Cart Item Request DTO
 * Used for receiving the new quantity for a cart item
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCartItemRequestDTO {

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be greater than 0")
    private Integer quantity;
}
