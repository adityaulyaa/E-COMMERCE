package com.ecommerce.service;

import com.ecommerce.dto.request.AddressRequestDTO;
import com.ecommerce.dto.response.AddressResponseDTO;
import com.ecommerce.entity.Address;
import com.ecommerce.entity.User;
import com.ecommerce.exception.AddressNotFoundException;
import com.ecommerce.exception.UnauthorizedAddressAccessException;
import com.ecommerce.mapper.AddressMapper;
import com.ecommerce.repository.AddressRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final AddressMapper addressMapper;

    @Transactional(readOnly = true)
    public List<AddressResponseDTO> getAllAddressesForCurrentUser(Long userId) {
        return addressRepository.findByUserUserId(userId).stream()
                .map(addressMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public AddressResponseDTO createAddress(Long userId, AddressRequestDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressMapper.toEntity(request, user);

        // If this is the first address, or if it's set as default
        List<Address> existingAddresses = addressRepository.findByUserUserId(userId);
        if (existingAddresses.isEmpty()) {
            address.setIsDefault(true);
        } else if (Boolean.TRUE.equals(address.getIsDefault())) {
            unsetExistingDefault(userId);
        }

        Address savedAddress = addressRepository.save(address);
        return addressMapper.toResponseDTO(savedAddress);
    }

    @Transactional
    public AddressResponseDTO updateAddress(Long userId, Long addressId, AddressRequestDTO request) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new AddressNotFoundException("Address not found"));

        if (!address.getUser().getUserId().equals(userId)) {
            throw new UnauthorizedAddressAccessException("You are not authorized to update this address");
        }

        address.setLabel(request.getLabel());
        address.setRecipientName(request.getRecipientName());
        address.setPhoneNumber(request.getPhoneNumber());
        address.setStreetAddress(request.getStreetAddress());
        address.setCity(request.getCity());
        address.setProvince(request.getProvince());
        address.setPostalCode(request.getPostalCode());

        // Handle default status change
        if (Boolean.TRUE.equals(request.getIsDefault()) && !Boolean.TRUE.equals(address.getIsDefault())) {
            unsetExistingDefault(userId);
            address.setIsDefault(true);
        }

        Address savedAddress = addressRepository.save(address);
        return addressMapper.toResponseDTO(savedAddress);
    }

    @Transactional
    public void deleteAddress(Long userId, Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new AddressNotFoundException("Address not found"));

        if (!address.getUser().getUserId().equals(userId)) {
            throw new UnauthorizedAddressAccessException("You are not authorized to delete this address");
        }

        boolean wasDefault = address.getIsDefault();
        addressRepository.delete(address);

        // If we deleted the default address, set another one as default if available
        if (wasDefault) {
            List<Address> remainingAddresses = addressRepository.findByUserUserId(userId);
            if (!remainingAddresses.isEmpty()) {
                Address newDefault = remainingAddresses.get(0);
                newDefault.setIsDefault(true);
                addressRepository.save(newDefault);
            }
        }
    }

    @Transactional
    public AddressResponseDTO setDefaultAddress(Long userId, Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new AddressNotFoundException("Address not found"));

        if (!address.getUser().getUserId().equals(userId)) {
            throw new UnauthorizedAddressAccessException("You are not authorized to modify this address");
        }

        unsetExistingDefault(userId);
        address.setIsDefault(true);
        Address savedAddress = addressRepository.save(address);
        return addressMapper.toResponseDTO(savedAddress);
    }

    private void unsetExistingDefault(Long userId) {
        addressRepository.findByUserUserIdAndIsDefaultTrue(userId)
                .ifPresent(existingDefault -> {
                    existingDefault.setIsDefault(false);
                    addressRepository.save(existingDefault);
                });
    }
}
