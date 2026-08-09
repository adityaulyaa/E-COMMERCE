package com.ecommerce.mapper;

import com.ecommerce.dto.request.AddressRequestDTO;
import com.ecommerce.dto.response.AddressResponseDTO;
import com.ecommerce.entity.Address;
import com.ecommerce.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public Address toEntity(AddressRequestDTO dto, User user) {
        if (dto == null) return null;
        
        return Address.builder()
                .user(user)
                .label(dto.getLabel())
                .recipientName(dto.getRecipientName())
                .phoneNumber(dto.getPhoneNumber())
                .streetAddress(dto.getStreetAddress())
                .city(dto.getCity())
                .province(dto.getProvince())
                .postalCode(dto.getPostalCode())
                .isDefault(dto.getIsDefault() != null ? dto.getIsDefault() : false)
                .build();
    }

    public AddressResponseDTO toResponseDTO(Address entity) {
        if (entity == null) return null;
        
        return AddressResponseDTO.builder()
                .addressId(entity.getAddressId())
                .label(entity.getLabel())
                .recipientName(entity.getRecipientName())
                .phoneNumber(entity.getPhoneNumber())
                .streetAddress(entity.getStreetAddress())
                .city(entity.getCity())
                .province(entity.getProvince())
                .postalCode(entity.getPostalCode())
                .isDefault(entity.getIsDefault())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
