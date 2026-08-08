package com.ecommerce.service;

import com.ecommerce.dto.response.CartResponseDTO;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.User;
import com.ecommerce.mapper.CartMapper;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShoppingCartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartMapper cartMapper;

    @Transactional
    public CartResponseDTO getCart(Long userId) {
        log.info("Fetching shopping cart for user ID: {}", userId);

        Cart cart = getOrCreateCart(userId);
        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getCartId());

        CartResponseDTO response = cartMapper.toCartResponseDTO(cart, cartItems);
        log.info("Returning cart ID: {} with {} item(s)", response.getCartId(), response.getTotalItems());

        return response;
    }

    @Transactional
    public Cart getOrCreateCart(Long userId) {
        validateUserId(userId);

        return cartRepository.findByUserId(userId)
                .orElseGet(() -> createCartForUser(userId));
    }

    @Transactional
    public void ensureCartExists(Long userId) {
        getOrCreateCart(userId);
    }

    private Cart createCartForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Cart cart = Cart.builder()
                .user(user)
                .build();

        Cart savedCart = cartRepository.save(cart);
        user.setCart(savedCart);

        log.info("Created shopping cart ID: {} for user ID: {}", savedCart.getCartId(), userId);
        return savedCart;
    }

    private void validateUserId(Long userId) {
        if (userId == null || userId <= 0) {
            throw new IllegalArgumentException("User ID must be a positive number");
        }
    }
}
