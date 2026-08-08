package com.ecommerce.controller;

import com.ecommerce.dto.response.CartResponseDTO;
import com.ecommerce.service.ShoppingCartService;
import com.ecommerce.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@Slf4j
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;
    private final SecurityUtil securityUtil;

    @GetMapping
    public ResponseEntity<CartResponseDTO> getCart() {
        Long userId = securityUtil.getCurrentUserId();
        log.info("Received GET /cart request for user ID: {}", userId);

        CartResponseDTO cart = shoppingCartService.getCart(userId);
        return ResponseEntity.ok(cart);
    }
}
