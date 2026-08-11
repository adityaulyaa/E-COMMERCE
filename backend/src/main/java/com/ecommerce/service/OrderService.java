package com.ecommerce.service;

import com.ecommerce.dto.response.OrderHistoryResponseDTO;
import com.ecommerce.dto.response.OrderSummaryDTO;
import com.ecommerce.entity.Orders;
import com.ecommerce.entity.Payment;
import com.ecommerce.repository.OrdersRepository;
import com.ecommerce.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrdersRepository ordersRepository;
    private final PaymentRepository paymentRepository;

    @Transactional(readOnly = true)
    public OrderHistoryResponseDTO getOrderHistory(Long userId) {
        log.info("Retrieving order history for user: {}", userId);

        List<Orders> orders = ordersRepository.findByUserUserIdOrderByOrderDateDesc(userId);

        List<OrderSummaryDTO> orderSummaries = orders.stream()
                .map(this::toOrderSummaryDTO)
                .toList();

        log.info("Order history retrieved for user {}: {} orders found", userId, orderSummaries.size());

        return OrderHistoryResponseDTO.builder()
                .orders(orderSummaries)
                .build();
    }

    private OrderSummaryDTO toOrderSummaryDTO(Orders order) {
        Payment payment = paymentRepository.findByOrderOrderId(order.getOrderId()).orElse(null);

        return OrderSummaryDTO.builder()
                .orderId(order.getOrderId())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .paymentStatus(payment != null ? payment.getPaymentStatus() : null)
                .orderStatus(order.getOrderStatus())
                .build();
    }
}
