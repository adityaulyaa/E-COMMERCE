package com.ecommerce.mapper;

import com.ecommerce.dto.response.ReviewResponseDTO;
import com.ecommerce.entity.Review;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReviewMapper {

    public ReviewResponseDTO toResponseDTO(Review review) {
        if (review == null) {
            return null;
        }

        return ReviewResponseDTO.builder()
                .reviewId(review.getReviewId())
                .authorName(review.getUser() != null ? review.getUser().getFullName() : "Anonymous")
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }

    public List<ReviewResponseDTO> toResponseDTOList(List<Review> reviews) {
        if (reviews == null || reviews.isEmpty()) {
            return List.of();
        }

        return reviews.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }
}