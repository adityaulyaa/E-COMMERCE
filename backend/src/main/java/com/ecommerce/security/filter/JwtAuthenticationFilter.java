package com.ecommerce.security.filter;

import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.jwt.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

/**
 * JWT Authentication Filter
 * Intercepts every request and validates JWT token from Authorization header
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Extract Authorization header
        final String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        String jwt = null;

        // Check if Authorization header exists and starts with "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Remove "Bearer " prefix
            try {
                email = jwtUtil.extractEmail(jwt);
                log.debug("JWT token found for email: {}", email);
            } catch (Exception e) {
                log.error("Error extracting email from JWT: {}", e.getMessage());
            }
        }

        // Validate token and set authentication
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            final String userEmail = email; // Make final for lambda
            try {
                // Load user from database
                var user = userRepository.findByEmail(userEmail)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userEmail));

                // Create UserDetails (Spring Security expects UserDetails interface)
                UserDetails userDetails = org.springframework.security.core.userdetails.User
                        .builder()
                        .username(user.getEmail())
                        .password(user.getPassword())
                        .authorities(new ArrayList<>()) // No roles for now
                        .build();

                // Validate token
                if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                    // Create authentication token
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    // Set authentication details
                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // Set authentication in SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    log.debug("User authenticated successfully: {}", userEmail);
                } else {
                    log.warn("JWT token validation failed for user: {}", userEmail);
                }
            } catch (UsernameNotFoundException e) {
                log.warn("User not found during JWT authentication: {}", userEmail);
            } catch (Exception e) {
                log.error("Error during JWT authentication: {}", e.getMessage());
            }
        }

        // Continue filter chain
        filterChain.doFilter(request, response);
    }
}
