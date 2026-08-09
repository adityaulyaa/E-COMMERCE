package com.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderSummaryResponseDTO {
    private List<OrderSummaryItemDTO> items;
    private BigDecimal totalAmount;
    private LocalDateTime generatedAt;
}
