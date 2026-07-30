package com.ecommerce.controller;

import com.ecommerce.dto.request.LoginRequestDTO;
import com.ecommerce.dto.request.RegisterRequestDTO;
import com.ecommerce.dto.response.LoginResponseDTO;
import com.ecommerce.dto.response.RegisterResponseDTO;
import com.ecommerce.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    /**
     * Register a new customer account
     *
     * @param registerRequest RegisterRequestDTO with registration data
     * @return ResponseEntity with RegisterResponseDTO
     */
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(
            @Valid @RequestBody RegisterRequestDTO registerRequest
    ) {
        log.info("Received registration request for email: {}", registerRequest.getEmail());
        
        RegisterResponseDTO response = authenticationService.register(registerRequest);
        
        log.info("Registration successful for email: {}", registerRequest.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Login with email and password
     *
     * @param loginRequest LoginRequestDTO with email and password
     * @return ResponseEntity with LoginResponseDTO containing JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO loginRequest
    ) {
        log.info("Received login request for email: {}", loginRequest.getEmail());
        
        LoginResponseDTO response = authenticationService.login(loginRequest);
        
        log.info("Login successful for email: {}", loginRequest.getEmail());
        return ResponseEntity.ok().body(response);
    }

}
