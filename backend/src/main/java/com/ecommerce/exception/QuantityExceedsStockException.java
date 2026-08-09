package com.ecommerce.exception;

public class QuantityExceedsStockException extends RuntimeException {

    public QuantityExceedsStockException(String message) {
        super(message);
    }

    public QuantityExceedsStockException(Long productId, int availableStock) {
        super("Requested quantity exceeds available stock for product ID " + productId
                + " (available: " + availableStock + ")");
    }
}
