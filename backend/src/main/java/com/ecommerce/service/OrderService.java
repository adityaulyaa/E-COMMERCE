package com.ecommerce.service;

import com.ecommerce.dto.response.OrderDetailResponseDTO;
import com.ecommerce.dto.response.OrderHistoryResponseDTO;
import com.ecommerce.dto.response.OrderItemDetailDTO;
import com.ecommerce.dto.response.OrderSummaryDTO;
import com.ecommerce.dto.response.PaymentDetailDTO;
import com.ecommerce.entity.OrderItem;
import com.ecommerce.entity.Orders;
import com.ecommerce.entity.Payment;
import com.ecommerce.exception.OrderNotFoundException;
import com.ecommerce.exception.UnauthorizedOrderAccessException;
import com.ecommerce.repository.OrderItemRepository;
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
    private final OrderItemRepository orderItemRepository;
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

    @Transactional(readOnly = true)
    public OrderDetailResponseDTO getOrderDetail(Long userId, Long orderId) {
        log.info("Retrieving order detail for user: {}, order: {}", userId, orderId);

        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + orderId));

        if (!order.getUser().getUserId().equals(userId)) {
            throw new UnauthorizedOrderAccessException("You are not authorized to view this order");
        }

        List<OrderItem> orderItems = orderItemRepository.findByOrderOrderId(order.getOrderId());
        Payment payment = paymentRepository.findByOrderOrderId(order.getOrderId()).orElse(null);

        List<OrderItemDetailDTO> itemDetails = orderItems.stream()
                .map(this::toOrderItemDetailDTO)
                .toList();

        log.info("Order detail retrieved for user: {}, order: {}", userId, orderId);

        return OrderDetailResponseDTO.builder()
                .orderId(order.getOrderId())
                .orderDate(order.getOrderDate())
                .items(itemDetails)
                .totalAmount(order.getTotalAmount())
                .paymentDetail(payment != null ? toPaymentDetailDTO(payment) : null)
                .orderStatus(order.getOrderStatus())
                .build();
    }

    private OrderItemDetailDTO toOrderItemDetailDTO(OrderItem orderItem) {
        return OrderItemDetailDTO.builder()
                .productNameSnapshot(orderItem.getProductNameSnapshot())
                .unitPriceSnapshot(orderItem.getUnitPriceSnapshot())
                .quantity(orderItem.getQuantity())
                .subtotal(orderItem.getSubtotal())
                .build();
    }

    private PaymentDetailDTO toPaymentDetailDTO(Payment payment) {
        return PaymentDetailDTO.builder()
                .paymentMethod(payment.getPaymentMethod())
                .paymentStatus(payment.getPaymentStatus())
                .paymentDate(payment.getPaymentDate())
                .build();
    }
}
