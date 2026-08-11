package com.ecommerce.controller;

import com.ecommerce.dto.response.OrderDetailResponseDTO;
import com.ecommerce.dto.response.OrderHistoryResponseDTO;
import com.ecommerce.service.OrderService;
import com.ecommerce.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("isAuthenticated()")
public class OrderController {

    private final OrderService orderService;
    private final SecurityUtil securityUtil;

    @GetMapping
    public ResponseEntity<OrderHistoryResponseDTO> getOrderHistory() {
        Long currentUserId = securityUtil.getCurrentUserId();
        log.info("Order history request received for user: {}", currentUserId);

        OrderHistoryResponseDTO orderHistory = orderService.getOrderHistory(currentUserId);

        log.info("Order history retrieved successfully for user: {}", currentUserId);
        return ResponseEntity.ok(orderHistory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetailResponseDTO> getOrderDetail(@PathVariable("id") Long orderId) {
        Long currentUserId = securityUtil.getCurrentUserId();
        log.info("Order detail request received for user: {}, order: {}", currentUserId, orderId);

        OrderDetailResponseDTO orderDetail = orderService.getOrderDetail(currentUserId, orderId);

        log.info("Order detail retrieved successfully for user: {}, order: {}", currentUserId, orderId);
        return ResponseEntity.ok(orderDetail);
    }
}
