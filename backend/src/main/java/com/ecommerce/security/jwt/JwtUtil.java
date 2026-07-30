package com.ecommerce.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JWT Utility Class
 * Handles JWT token generation, validation, and extraction
 * Compatible with io.jsonwebtoken:jjwt 0.12.5
 */
@Component
@Slf4j
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    /**
     * Generate JWT token for user
     *
     * @param email User email
     * @return JWT token string
     */
    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }

    /**
     * Create JWT token with claims and subject
     *
     * @param claims Additional claims
     * @param subject Email as subject
     * @return JWT token string
     */
    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        log.debug("Creating JWT token for user: {}, expires at: {}", subject, expiryDate);

        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extract email from JWT token
     *
     * @param token JWT token
     * @return Email string
     */
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extract expiration date from JWT token
     *
     * @param token JWT token
     * @return Expiration date
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extract specific claim from JWT token
     *
     * @param token JWT token
     * @param claimsResolver Function to extract claim
     * @param <T> Claim type
     * @return Extracted claim
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extract all claims from JWT token
     *
     * @param token JWT token
     * @return All claims
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Check if JWT token is expired
     *
     * @param token JWT token
     * @return true if expired, false otherwise
     */
    public Boolean isTokenExpired(String token) {
        try {
            return extractExpiration(token).before(new Date());
        } catch (Exception e) {
            log.warn("Error checking token expiration: {}", e.getMessage());
            return true;
        }
    }

    /**
     * Validate JWT token
     *
     * @param token JWT token
     * @param email User email to validate against
     * @return true if valid, false otherwise
     */
    public Boolean validateToken(String token, String email) {
        try {
            final String extractedEmail = extractEmail(token);
            boolean isValid = extractedEmail.equals(email) && !isTokenExpired(token);
            
            if (isValid) {
                log.debug("JWT token validated successfully for user: {}", email);
            } else {
                log.warn("JWT token validation failed for user: {}", email);
            }
            
            return isValid;
        } catch (Exception e) {
            log.error("Error validating JWT token: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Get signing key from secret
     *
     * @return SecretKey for signing
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }
}
