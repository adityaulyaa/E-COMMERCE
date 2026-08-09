package com.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {

    private Long cartItemId;
    private Long productId;
    private String productName;
    private BigDecimal productPrice;
    private String productImageUrl;
    private Integer quantity;
    private BigDecimal subtotal;
}
