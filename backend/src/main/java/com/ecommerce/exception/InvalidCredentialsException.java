package com.ecommerce.exception;

/**
 * Invalid Credentials Exception
 * Thrown when email not found or password incorrect
 */
public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException(String message) {
        super(message);
    }

    public InvalidCredentialsException(String message, Throwable cause) {
        super(message, cause);
    }
}
