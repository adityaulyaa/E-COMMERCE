package com.ecommerce.service;

import com.ecommerce.dto.request.AddToCartRequestDTO;
import com.ecommerce.dto.request.UpdateCartItemRequestDTO;
import com.ecommerce.dto.response.CartResponseDTO;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.exception.CartItemNotFoundException;
import com.ecommerce.exception.OutOfStockException;
import com.ecommerce.exception.ProductNotFoundException;
import com.ecommerce.exception.QuantityExceedsStockException;
import com.ecommerce.exception.UnauthorizedCartAccessException;
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
    public CartResponseDTO addToCart(Long userId, AddToCartRequestDTO request) {
        log.info("Adding product ID: {} (quantity: {}) to cart for user ID: {}",
                request.getProductId(), request.getQuantity(), userId);

        Cart cart = getOrCreateCart(userId);
        Long productId = request.getProductId();
        Integer requestedQuantity = request.getQuantity();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        Integer stock = product.getStock() != null ? product.getStock() : 0;
        if (stock <= 0) {
            throw new OutOfStockException(productId);
        }
        if (requestedQuantity > stock) {
            throw new QuantityExceedsStockException(stock);
        }

        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getCartId(), productId)
                .orElseGet(() -> CartItem.builder()
                        .cart(cart)
                        .product(product)
                        .quantity(0)
                        .build());

        int newQuantity = cartItem.getQuantity() + requestedQuantity;
        if (newQuantity > stock) {
            throw new QuantityExceedsStockException(stock);
        }

        cartItem.setQuantity(newQuantity);
        cartItemRepository.save(cartItem);

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getCartId());
        CartResponseDTO response = cartMapper.toCartResponseDTO(cart, cartItems);

        log.info("Product ID: {} added to cart ID: {}. New total quantity: {}",
                productId, cart.getCartId(), response.getTotalQuantity());

        return response;
    }

    @Transactional
    public CartResponseDTO updateCartItem(Long userId, Long cartItemId, UpdateCartItemRequestDTO request) {
        log.info("Updating cart item ID: {} (quantity: {}) for user ID: {}",
                cartItemId, request.getQuantity(), userId);

        Cart cart = getOrCreateCart(userId);

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartItemNotFoundException(cartItemId));

        if (!cartItem.getCart().getCartId().equals(cart.getCartId())) {
            throw new UnauthorizedCartAccessException(
                    "Cart item with ID " + cartItemId + " does not belong to the current user");
        }

        Product product = cartItem.getProduct();
        Integer stock = product.getStock() != null ? product.getStock() : 0;
        if (stock <= 0) {
            throw new OutOfStockException(product.getProductId());
        }

        Integer newQuantity = request.getQuantity();
        if (newQuantity > stock) {
            throw new QuantityExceedsStockException(stock);
        }

        cartItem.setQuantity(newQuantity);
        cartItemRepository.save(cartItem);

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getCartId());
        CartResponseDTO response = cartMapper.toCartResponseDTO(cart, cartItems);

        log.info("Cart item ID: {} updated to quantity: {}. New cart total amount: {}",
                cartItemId, newQuantity, response.getTotalAmount());

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
