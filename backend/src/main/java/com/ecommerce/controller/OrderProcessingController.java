package com.ecommerce.controller;

import com.ecommerce.dto.response.OrderSummaryResponseDTO;
import com.ecommerce.service.OrderProcessingService;
import com.ecommerce.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/checkout")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("isAuthenticated()")
public class OrderProcessingController {

    private final OrderProcessingService orderProcessingService;
    private final SecurityUtil securityUtil;

    @PostMapping
    public ResponseEntity<OrderSummaryResponseDTO> checkout(
            @RequestParam(required = false) Long productId,
            @RequestParam(required = false) Integer quantity
    ) {
        Long currentUserId = securityUtil.getCurrentUserId();
        log.info("Checkout request received for user: {}", currentUserId);

        OrderSummaryResponseDTO orderSummary = orderProcessingService.checkout(currentUserId, productId, quantity);

        log.info("Checkout completed successfully for user: {}", currentUserId);
        return ResponseEntity.ok(orderSummary);
    }
}
