package com.ecommerce.mapper;

import com.ecommerce.dto.request.RegisterRequestDTO;
import com.ecommerce.dto.response.RegisterResponseDTO;
import com.ecommerce.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    /**
     * Convert RegisterRequestDTO to User Entity
     * Password is set here but will be encoded in Service layer
     *
     * @param dto the register request DTO
     * @return User entity ready to be persisted
     */
    public User toEntity(RegisterRequestDTO dto) {
        return User.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build();
    }

    /**
     * Convert User Entity to RegisterResponseDTO
     * Password is NOT included in response for security reasons
     *
     * @param user the user entity
     * @return Register response DTO
     */
    public RegisterResponseDTO toRegisterResponseDTO(User user) {
        return RegisterResponseDTO.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .message("Account created successfully")
                .build();
    }

}
