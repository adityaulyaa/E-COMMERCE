package com.ecommerce.entity;

public enum PaymentMethod {
    BANK_TRANSFER("Bank Transfer"),
    QRIS("QRIS"),
    E_WALLET("E-Wallet");

    private final String displayName;

    PaymentMethod(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
