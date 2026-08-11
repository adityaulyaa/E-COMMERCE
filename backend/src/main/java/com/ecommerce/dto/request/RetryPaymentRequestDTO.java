package com.ecommerce.dto.request;

import com.ecommerce.entity.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RetryPaymentRequestDTO {

    @NotNull(message = "Payment ID is required")
    private Long paymentId;

    private PaymentMethod paymentMethod;
}
