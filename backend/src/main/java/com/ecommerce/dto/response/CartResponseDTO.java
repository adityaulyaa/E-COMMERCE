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
public class CartResponseDTO {

    private Long cartId;
    private List<CartItemDTO> items;
    private BigDecimal totalAmount;
    private Integer totalItems;
    private Integer totalQuantity;
}
