package com.ecommerce.service;

import com.ecommerce.mapper.ReviewMapper;
import com.ecommerce.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    @Transactional(readOnly = true)
    public List<com.ecommerce.dto.response.ReviewResponseDTO> getReviewsByProduct(Long productId) {
        log.info("Fetching reviews for product ID: {}", productId);
        List<com.ecommerce.entity.Review> reviews = reviewRepository.findByProductProductIdOrderByCreatedAtDesc(productId);
        return reviewMapper.toResponseDTOList(reviews);
    }
}