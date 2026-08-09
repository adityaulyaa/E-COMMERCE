package com.ecommerce.exception;

public class UnauthorizedAddressAccessException extends RuntimeException {
    public UnauthorizedAddressAccessException(String message) {
        super(message);
    }
}
