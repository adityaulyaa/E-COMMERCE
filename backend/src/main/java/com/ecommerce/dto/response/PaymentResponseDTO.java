package com.ecommerce.dto.response;

import com.ecommerce.entity.OrderStatus;
import com.ecommerce.entity.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDTO {

    private Long orderId;
    private PaymentStatus paymentStatus;
    private OrderStatus orderStatus;
    private String message;
    private BigDecimal totalAmount;
}
