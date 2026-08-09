package com.ecommerce.exception;

public class QuantityExceedsStockException extends RuntimeException {

    public QuantityExceedsStockException(String message) {
        super(message);
    }

    public QuantityExceedsStockException(int availableStock) {
        super("Insufficient stock. Maximum quantity that can be ordered is " + availableStock + ".");
    }
}
