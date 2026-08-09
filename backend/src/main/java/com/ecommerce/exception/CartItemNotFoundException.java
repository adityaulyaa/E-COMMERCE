package com.ecommerce.exception;

public class CartItemNotFoundException extends RuntimeException {

    public CartItemNotFoundException(String message) {
        super(message);
    }

    public CartItemNotFoundException(Long cartItemId) {
        super("Cart item with ID " + cartItemId + " not found");
    }
}
