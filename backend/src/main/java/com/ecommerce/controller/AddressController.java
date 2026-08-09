package com.ecommerce.controller;

import com.ecommerce.dto.request.AddressRequestDTO;
import com.ecommerce.dto.response.AddressResponseDTO;
import com.ecommerce.service.AddressService;
import com.ecommerce.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class AddressController {

    private final AddressService addressService;
    private final SecurityUtil securityUtil;

    @GetMapping
    public ResponseEntity<List<AddressResponseDTO>> getAllAddresses() {
        Long currentUserId = securityUtil.getCurrentUserId();
        List<AddressResponseDTO> addresses = addressService.getAllAddressesForCurrentUser(currentUserId);
        return ResponseEntity.ok(addresses);
    }

    @PostMapping
    public ResponseEntity<AddressResponseDTO> createAddress(@Valid @RequestBody AddressRequestDTO request) {
        Long currentUserId = securityUtil.getCurrentUserId();
        AddressResponseDTO createdAddress = addressService.createAddress(currentUserId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressResponseDTO> updateAddress(@PathVariable("id") Long addressId, @Valid @RequestBody AddressRequestDTO request) {
        Long currentUserId = securityUtil.getCurrentUserId();
        AddressResponseDTO updatedAddress = addressService.updateAddress(currentUserId, addressId, request);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable("id") Long addressId) {
        Long currentUserId = securityUtil.getCurrentUserId();
        addressService.deleteAddress(currentUserId, addressId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/default")
    public ResponseEntity<AddressResponseDTO> setDefaultAddress(@PathVariable("id") Long addressId) {
        Long currentUserId = securityUtil.getCurrentUserId();
        AddressResponseDTO updatedAddress = addressService.setDefaultAddress(currentUserId, addressId);
        return ResponseEntity.ok(updatedAddress);
    }
}
