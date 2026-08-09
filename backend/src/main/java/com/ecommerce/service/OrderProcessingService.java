package com.ecommerce.service;

import com.ecommerce.dto.response.OrderSummaryItemDTO;
import com.ecommerce.dto.response.OrderSummaryResponseDTO;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.EmptyCartException;
import com.ecommerce.exception.InvalidCartException;
import com.ecommerce.exception.ProductNotFoundException;
import com.ecommerce.exception.QuantityExceedsStockException;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderProcessingService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public OrderSummaryResponseDTO checkout(Long userId, Long productId, Integer quantity) {
        log.info("Processing checkout for user: {}", userId);

        // "Buy Now" mode: checkout single product directly without using cart
        if (productId != null) {
            return checkoutSingleProduct(userId, productId, quantity);
        }

        // Normal mode: checkout from user's cart
        return checkoutFromCart(userId);
    }

    private OrderSummaryResponseDTO checkoutFromCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new InvalidCartException("Cart not found for user"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new EmptyCartException("Shopping cart is empty. Please add items before checkout.");
        }

        List<OrderSummaryItemDTO> summaryItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findById(cartItem.getProduct().getProductId())
                    .orElseThrow(() -> new ProductNotFoundException(
                            "Product not found: " + cartItem.getProduct().getName()));

            if (cartItem.getQuantity() > product.getStock()) {
                throw new QuantityExceedsStockException(
                        String.format("Product '%s' requested quantity (%d) exceeds available stock (%d)",
                                product.getName(),
                                cartItem.getQuantity(),
                                product.getStock()));
            }

            if (product.getStock() <= 0) {
                throw new QuantityExceedsStockException(
                        String.format("Product '%s' is out of stock", product.getName()));
            }

            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            OrderSummaryItemDTO itemDTO = OrderSummaryItemDTO.builder()
                    .productId(product.getProductId())
                    .productName(product.getName())
                    .productImageUrl(product.getImages() != null && !product.getImages().isEmpty() ? product.getImages().get(0).getImageUrl() : null)
                    .unitPrice(product.getPrice())
                    .quantity(cartItem.getQuantity())
                    .subtotal(subtotal)
                    .build();

            summaryItems.add(itemDTO);
            totalAmount = totalAmount.add(subtotal);
        }

        log.info("Checkout successful for user {}. Total amount: {}", userId, totalAmount);

        return OrderSummaryResponseDTO.builder()
                .items(summaryItems)
                .totalAmount(totalAmount)
                .generatedAt(LocalDateTime.now())
                .build();
    }

    private OrderSummaryResponseDTO checkoutSingleProduct(Long userId, Long productId, Integer quantity) {
        log.info("Processing buy-now checkout for user: {}, product: {}, quantity: {}", userId, productId, quantity);

        int requestedQuantity = (quantity != null && quantity > 0) ? quantity : 1;

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Product not found: " + productId));

        if (product.getStock() <= 0) {
            throw new QuantityExceedsStockException(
                    String.format("Product '%s' is out of stock", product.getName()));
        }

        if (requestedQuantity > product.getStock()) {
            throw new QuantityExceedsStockException(
                    String.format("Product '%s' requested quantity (%d) exceeds available stock (%d)",
                            product.getName(),
                            requestedQuantity,
                            product.getStock()));
        }

        BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(requestedQuantity));

        OrderSummaryItemDTO itemDTO = OrderSummaryItemDTO.builder()
                .productId(product.getProductId())
                .productName(product.getName())
                .productImageUrl(product.getImages() != null && !product.getImages().isEmpty() ? product.getImages().get(0).getImageUrl() : null)
                .unitPrice(product.getPrice())
                .quantity(requestedQuantity)
                .subtotal(subtotal)
                .build();

        List<OrderSummaryItemDTO> summaryItems = new ArrayList<>();
        summaryItems.add(itemDTO);

        log.info("Buy-now checkout successful for user {}. Total amount: {}", userId, subtotal);

        return OrderSummaryResponseDTO.builder()
                .items(summaryItems)
                .totalAmount(subtotal)
                .generatedAt(LocalDateTime.now())
                .build();
    }
}
