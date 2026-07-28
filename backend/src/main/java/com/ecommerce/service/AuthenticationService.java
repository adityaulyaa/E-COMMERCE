package com.ecommerce.service;

import com.ecommerce.dto.request.RegisterRequestDTO;
import com.ecommerce.dto.response.RegisterResponseDTO;
import com.ecommerce.entity.User;
import com.ecommerce.exception.EmailAlreadyExistsException;
import com.ecommerce.mapper.UserMapper;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    /**
     * Register a new customer account
     *
     * @param dto RegisterRequestDTO containing registration data
     * @return RegisterResponseDTO with user information
     * @throws EmailAlreadyExistsException if email already registered
     * @throws IllegalArgumentException if passwords don't match
     */
    @Transactional
    public RegisterResponseDTO register(RegisterRequestDTO dto) {
        log.info("Starting registration process for email: {}", dto.getEmail());

        // Validate password and confirmPassword match
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            log.warn("Password mismatch for email: {}", dto.getEmail());
            throw new IllegalArgumentException("Password and Confirm Password must match");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(dto.getEmail())) {
            log.warn("Email already registered: {}", dto.getEmail());
            throw new EmailAlreadyExistsException("Email already registered: " + dto.getEmail());
        }

        // Convert DTO to Entity
        User user = userMapper.toEntity(dto);

        // Encode password using BCrypt
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        // Save user to database
        User savedUser = userRepository.save(user);
        log.info("User registered successfully with email: {}", savedUser.getEmail());

        // Convert Entity to Response DTO
        return userMapper.toRegisterResponseDTO(savedUser);
    }

}
