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
public class OrderItemDetailDTO {

    private String productNameSnapshot;
    private BigDecimal unitPriceSnapshot;
    private Integer quantity;
    private BigDecimal subtotal;
}
