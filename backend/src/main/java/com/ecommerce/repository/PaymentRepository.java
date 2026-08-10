package com.ecommerce.repository;

import com.ecommerce.entity.Payment;
import com.ecommerce.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    Optional<Payment> findByOrderOrderId(Long orderId);
    
    Optional<Payment> findByPaymentIdAndPaymentStatus(Long paymentId, PaymentStatus paymentStatus);
}
