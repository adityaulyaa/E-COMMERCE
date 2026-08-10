package com.ecommerce.dto.request;

import jakarta.validation.constraints.NotNull;
import com.ecommerce.entity.PaymentMethod;

public class SelectPaymentMethodRequestDTO {
    
    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    public SelectPaymentMethodRequestDTO() {}

    public SelectPaymentMethodRequestDTO(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
