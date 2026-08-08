package com.ecommerce.controller;

import com.ecommerce.dto.response.ReviewResponseDTO;
import com.ecommerce.service.ReviewService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{productId}/reviews")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsByProduct(
            @PathVariable Long productId) {

        if (productId == null || productId <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        List<ReviewResponseDTO> reviews = reviewService.getReviewsByProduct(productId);
        return ResponseEntity.ok(reviews);
    }
}