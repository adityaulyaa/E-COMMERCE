package com.ecommerce.controller;

import com.ecommerce.dto.request.AddToCartRequestDTO;
import com.ecommerce.dto.response.CartResponseDTO;
import com.ecommerce.service.ShoppingCartService;
import com.ecommerce.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/items")
    public ResponseEntity<CartResponseDTO> addToCart(
            @Valid @RequestBody AddToCartRequestDTO request
    ) {
        Long userId = securityUtil.getCurrentUserId();
        log.info("Received POST /cart/items request for user ID: {} with product ID: {}",
                userId, request.getProductId());

        CartResponseDTO updatedCart = shoppingCartService.addToCart(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedCart);
    }
}
