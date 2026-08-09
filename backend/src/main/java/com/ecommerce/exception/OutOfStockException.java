package com.ecommerce.exception;

public class OutOfStockException extends RuntimeException {

    public OutOfStockException(String message) {
        super(message);
    }

    public OutOfStockException(Long productId) {
        super("Product with ID " + productId + " is out of stock");
    }
}
