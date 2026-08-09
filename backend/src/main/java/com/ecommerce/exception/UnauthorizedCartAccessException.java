package com.ecommerce.exception;

public class UnauthorizedCartAccessException extends RuntimeException {

    public UnauthorizedCartAccessException(String message) {
        super(message);
    }
}
