package com.ecommerce.mapper;

import com.ecommerce.dto.response.CartItemDTO;
import com.ecommerce.dto.response.CartResponseDTO;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class CartMapper {

    public CartItemDTO toCartItemDTO(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }

        Product product = cartItem.getProduct();
        BigDecimal productPrice = product != null && product.getPrice() != null
                ? product.getPrice()
                : BigDecimal.ZERO;
        Integer quantity = cartItem.getQuantity() != null ? cartItem.getQuantity() : 0;
        BigDecimal subtotal = productPrice.multiply(BigDecimal.valueOf(quantity));

        return CartItemDTO.builder()
                .cartItemId(cartItem.getCartItemId())
                .productId(product != null ? product.getProductId() : null)
                .productName(product != null ? product.getName() : null)
                .productPrice(productPrice)
                .productImageUrl(resolveProductImageUrl(product))
                .quantity(quantity)
                .subtotal(subtotal)
                .build();
    }

    public CartResponseDTO toCartResponseDTO(Cart cart) {
        if (cart == null) {
            return null;
        }

        return toCartResponseDTO(cart, cart.getItems());
    }

    public CartResponseDTO toCartResponseDTO(Cart cart, List<CartItem> cartItems) {
        if (cart == null) {
            return null;
        }

        List<CartItemDTO> items = cartItems == null
                ? List.of()
                : cartItems.stream()
                .map(this::toCartItemDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        BigDecimal totalAmount = items.stream()
                .map(CartItemDTO::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalQuantity = items.stream()
                .map(CartItemDTO::getQuantity)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .sum();

        return CartResponseDTO.builder()
                .cartId(cart.getCartId())
                .items(items)
                .totalAmount(totalAmount)
                .totalItems(items.size())
                .totalQuantity(totalQuantity)
                .build();
    }

    private String resolveProductImageUrl(Product product) {
        if (product == null || product.getImages() == null || product.getImages().isEmpty()) {
            return null;
        }

        return product.getImages().get(0).getImageUrl();
    }
}
