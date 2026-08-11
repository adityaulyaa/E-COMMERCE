package com.ecommerce.dto.response;

import com.ecommerce.entity.OrderStatus;
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
public class OrderDetailResponseDTO {

    private Long orderId;
    private LocalDateTime orderDate;
    private List<OrderItemDetailDTO> items;
    private BigDecimal totalAmount;
    private PaymentDetailDTO paymentDetail;
    private OrderStatus orderStatus;
}
