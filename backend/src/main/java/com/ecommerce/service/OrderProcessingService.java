package com.ecommerce.service;

import com.ecommerce.dto.response.OrderSummaryItemDTO;
import com.ecommerce.dto.response.OrderSummaryResponseDTO;
import com.ecommerce.dto.response.PaymentResponseDTO;
import com.ecommerce.dto.request.ProcessPaymentRequestDTO;
import com.ecommerce.dto.request.RetryPaymentRequestDTO;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.PaymentMethod;
import com.ecommerce.entity.Orders;
import com.ecommerce.entity.OrderItem;
import com.ecommerce.entity.Payment;
import com.ecommerce.entity.OrderStatus;
import com.ecommerce.entity.PaymentStatus;
import com.ecommerce.entity.User;
import com.ecommerce.exception.EmptyCartException;
import com.ecommerce.exception.InvalidCartException;
import com.ecommerce.exception.InvalidPaymentStatusException;
import com.ecommerce.exception.PaymentNotFoundException;
import com.ecommerce.exception.ProductNotFoundException;
import com.ecommerce.exception.QuantityExceedsStockException;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.OrdersRepository;
import com.ecommerce.repository.OrderItemRepository;
import com.ecommerce.repository.PaymentRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderProcessingService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final OrdersRepository ordersRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public OrderSummaryResponseDTO checkout(Long userId, Long productId, Integer quantity) {
        log.info("Processing checkout for user: {}", userId);

        // "Buy Now" mode: checkout single product directly without using cart
        if (productId != null) {
            return checkoutSingleProduct(userId, productId, quantity);
        }

        // Normal mode: checkout from user's cart
        return checkoutFromCart(userId);
    }

    private OrderSummaryResponseDTO checkoutFromCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new InvalidCartException("Cart not found for user"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new EmptyCartException("Shopping cart is empty. Please add items before checkout.");
        }

        List<OrderSummaryItemDTO> summaryItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findById(cartItem.getProduct().getProductId())
                    .orElseThrow(() -> new ProductNotFoundException(
                            "Product not found: " + cartItem.getProduct().getName()));

            if (cartItem.getQuantity() > product.getStock()) {
                throw new QuantityExceedsStockException(
                        String.format("Product '%s' requested quantity (%d) exceeds available stock (%d)",
                                product.getName(),
                                cartItem.getQuantity(),
                                product.getStock()));
            }

            if (product.getStock() <= 0) {
                throw new QuantityExceedsStockException(
                        String.format("Product '%s' is out of stock", product.getName()));
            }

            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            OrderSummaryItemDTO itemDTO = OrderSummaryItemDTO.builder()
                    .productId(product.getProductId())
                    .productName(product.getName())
                    .productImageUrl(product.getImages() != null && !product.getImages().isEmpty() ? product.getImages().get(0).getImageUrl() : null)
                    .unitPrice(product.getPrice())
                    .quantity(cartItem.getQuantity())
                    .subtotal(subtotal)
                    .build();

            summaryItems.add(itemDTO);
            totalAmount = totalAmount.add(subtotal);
        }

        log.info("Checkout successful for user {}. Total amount: {}", userId, totalAmount);

        return OrderSummaryResponseDTO.builder()
                .items(summaryItems)
                .totalAmount(totalAmount)
                .generatedAt(LocalDateTime.now())
                .build();
    }

    private OrderSummaryResponseDTO checkoutSingleProduct(Long userId, Long productId, Integer quantity) {
        log.info("Processing buy-now checkout for user: {}, product: {}, quantity: {}", userId, productId, quantity);

        int requestedQuantity = (quantity != null && quantity > 0) ? quantity : 1;

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(
                        "Product not found: " + productId));

        if (product.getStock() <= 0) {
            throw new QuantityExceedsStockException(
                    String.format("Product '%s' is out of stock", product.getName()));
        }

        if (requestedQuantity > product.getStock()) {
            throw new QuantityExceedsStockException(
                    String.format("Product '%s' requested quantity (%d) exceeds available stock (%d)",
                            product.getName(),
                            requestedQuantity,
                            product.getStock()));
        }

        BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(requestedQuantity));

        OrderSummaryItemDTO itemDTO = OrderSummaryItemDTO.builder()
                .productId(product.getProductId())
                .productName(product.getName())
                .productImageUrl(product.getImages() != null && !product.getImages().isEmpty() ? product.getImages().get(0).getImageUrl() : null)
                .unitPrice(product.getPrice())
                .quantity(requestedQuantity)
                .subtotal(subtotal)
                .build();

        List<OrderSummaryItemDTO> summaryItems = new ArrayList<>();
        summaryItems.add(itemDTO);

        log.info("Buy-now checkout successful for user {}. Total amount: {}", userId, subtotal);

        return OrderSummaryResponseDTO.builder()
                .items(summaryItems)
                .totalAmount(subtotal)
                .generatedAt(LocalDateTime.now())
                .build();
    }

    /**
     * Validate payment method
     * 
     * @param paymentMethod The payment method to validate
     * @return true if valid
     * @throws IllegalArgumentException if payment method is null or invalid
     */
    public boolean validatePaymentMethod(PaymentMethod paymentMethod) {
        if (paymentMethod == null) {
            throw new IllegalArgumentException("Payment method cannot be null");
        }
        
        // Payment method is valid if it's one of the enum values
        // Enum validation is automatically handled by Java
        log.info("Payment method validated: {}", paymentMethod);
        return true;
    }

    /**
     * Process payment and create order
     * 
     * @param userId User ID
     * @param request Payment request containing payment method
     * @return Payment response with order details
     */
    @Transactional
    public PaymentResponseDTO processPayment(Long userId, ProcessPaymentRequestDTO request) {
        log.info("Processing payment for user: {} with method: {}", userId, request.getPaymentMethod());

        validatePaymentMethod(request.getPaymentMethod());

        // "Buy Now" mode: process single product directly
        if (request.getProductId() != null) {
            return processBuyNowPayment(userId, request);
        }

        // Normal mode: process from user's cart
        return processCartPayment(userId, request);
    }

    private PaymentResponseDTO processCartPayment(Long userId, ProcessPaymentRequestDTO request) {
        log.info("Processing cart payment for user: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidCartException("User not found"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new InvalidCartException("Cart not found for user"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new EmptyCartException("Shopping cart is empty. Cannot process payment.");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CartItem cartItem : cart.getItems()) {
            Product product = productRepository.findById(cartItem.getProduct().getProductId())
                    .orElseThrow(() -> new ProductNotFoundException(
                            "Product not found: " + cartItem.getProduct().getName()));

            if (product.getStock() <= 0) {
                throw new QuantityExceedsStockException(
                        String.format("Product '%s' is out of stock", product.getName()));
            }

            if (cartItem.getQuantity() > product.getStock()) {
                throw new QuantityExceedsStockException(
                        String.format("Product '%s' requested quantity (%d) exceeds available stock (%d)",
                                product.getName(),
                                cartItem.getQuantity(),
                                product.getStock()));
            }

            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            totalAmount = totalAmount.add(subtotal);
        }

        boolean paymentSuccess = simulateMockPayment();

        if (!paymentSuccess) {
            log.warn("Payment simulation failed for user: {}", userId);
            Orders order = createOrderFromCart(user, cart, totalAmount, request.getPaymentMethod());
            Payment payment = createFailedPaymentRecord(order, request.getPaymentMethod());
            clearCartItems(cart);
            
            return PaymentResponseDTO.builder()
                    .orderId(order.getOrderId())
                    .paymentId(payment.getPaymentId())
                    .paymentStatus(PaymentStatus.FAILED)
                    .orderStatus(OrderStatus.PENDING)
                    .message("Payment failed. Please retry payment or try another payment method.")
                    .totalAmount(totalAmount)
                    .build();
        }

        Orders order = createOrderFromCart(user, cart, totalAmount, request.getPaymentMethod());
        
        for (CartItem cartItem : cart.getItems()) {
            reduceStock(cartItem.getProduct(), cartItem.getQuantity());
        }
        
        createPaymentRecord(order, request.getPaymentMethod());
        order.setOrderStatus(OrderStatus.COMPLETED);
        ordersRepository.save(order);
        
        clearCartItems(cart);

        log.info("Cart payment successful for user: {}. Order created: {}", userId, order.getOrderId());

        return buildSuccessPaymentResponse(order, totalAmount);
    }
    
    private PaymentResponseDTO processBuyNowPayment(Long userId, ProcessPaymentRequestDTO request) {
        log.info("Processing buy-now payment for user: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidCartException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ProductNotFoundException("Product not found for Buy Now."));
        
        int quantity = (request.getQuantity() != null && request.getQuantity() > 0) ? request.getQuantity() : 1;

        if (product.getStock() <= 0) {
            throw new QuantityExceedsStockException(
                    String.format("Product '%s' is out of stock", product.getName()));
        }

        if (quantity > product.getStock()) {
            throw new QuantityExceedsStockException(
                    String.format("Product '%s' requested quantity (%d) exceeds available stock (%d)",
                            product.getName(),
                            quantity,
                            product.getStock()));
        }
        
        BigDecimal totalAmount = product.getPrice().multiply(BigDecimal.valueOf(quantity));

        boolean paymentSuccess = simulateMockPayment();

        if (!paymentSuccess) {
            log.warn("Buy Now payment simulation failed for user: {}", userId);
            Orders order = createOrderFromBuyNow(user, product, quantity, totalAmount, request.getPaymentMethod());
            Payment payment = createFailedPaymentRecord(order, request.getPaymentMethod());
            
            return PaymentResponseDTO.builder()
                    .orderId(order.getOrderId())
                    .paymentId(payment.getPaymentId())
                    .paymentStatus(PaymentStatus.FAILED)
                    .orderStatus(OrderStatus.PENDING)
                    .message("Payment failed. Please retry payment or try another payment method.")
                    .totalAmount(totalAmount)
                    .build();
        }

        Orders order = createOrderFromBuyNow(user, product, quantity, totalAmount, request.getPaymentMethod());

        reduceStock(product, quantity);
        createPaymentRecord(order, request.getPaymentMethod());
        order.setOrderStatus(OrderStatus.COMPLETED);
        ordersRepository.save(order);

        log.info("Buy Now payment successful for user: {}. Order created: {}", userId, order.getOrderId());

        return buildSuccessPaymentResponse(order, totalAmount);
    }
    
    private Orders createOrderFromCart(User user, Cart cart, BigDecimal totalAmount, PaymentMethod paymentMethod) {
        Orders order = Orders.builder()
                .user(user)
                .totalAmount(totalAmount)
                .orderStatus(OrderStatus.PENDING)
                .orderDate(LocalDateTime.now())
                .build();
        
        order = ordersRepository.save(order);

        for (CartItem cartItem : cart.getItems()) {
            createOrderItem(order, cartItem.getProduct(), cartItem.getQuantity());
        }
        
        return order;
    }
    
    private Orders createOrderFromBuyNow(User user, Product product, int quantity, BigDecimal totalAmount, PaymentMethod paymentMethod) {
        Orders order = Orders.builder()
                .user(user)
                .totalAmount(totalAmount)
                .orderStatus(OrderStatus.PENDING)
                .orderDate(LocalDateTime.now())
                .build();
        
        order = ordersRepository.save(order);

        createOrderItem(order, product, quantity);
        
        return order;
    }
    
    private void createOrderItem(Orders order, Product product, int quantity) {
        BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(quantity));
        OrderItem orderItem = OrderItem.builder()
                .order(order)
                .product(product)
                .productNameSnapshot(product.getName())
                .unitPriceSnapshot(product.getPrice())
                .quantity(quantity)
                .subtotal(subtotal)
                .build();
        orderItemRepository.save(orderItem);
    }

    private void reduceStock(Product product, int quantity) {
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }

    private void createPaymentRecord(Orders order, PaymentMethod paymentMethod) {
        Payment payment = Payment.builder()
                .order(order)
                .paymentMethod(paymentMethod)
                .paymentStatus(PaymentStatus.SUCCESS)
                .paymentDate(LocalDateTime.now())
                .build();
        paymentRepository.save(payment);
    }

    private Payment createFailedPaymentRecord(Orders order, PaymentMethod paymentMethod) {
        Payment payment = Payment.builder()
                .order(order)
                .paymentMethod(paymentMethod)
                .paymentStatus(PaymentStatus.FAILED)
                .paymentDate(LocalDateTime.now())
                .build();
        return paymentRepository.save(payment);
    }

    private void clearCartItems(Cart cart) {
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private PaymentResponseDTO buildSuccessPaymentResponse(Orders order, BigDecimal totalAmount) {
        return PaymentResponseDTO.builder()
                .orderId(order.getOrderId())
                .paymentStatus(PaymentStatus.SUCCESS)
                .orderStatus(OrderStatus.COMPLETED)
                .message("Payment successful! Your order has been placed.")
                .totalAmount(totalAmount)
                .build();
    }

    /**
     * Retry failed payment
     * 
     * @param userId User ID
     * @param request Retry payment request containing paymentId
     * @return Payment response with retry result
     */
    @Transactional
    public PaymentResponseDTO retryPayment(Long userId, RetryPaymentRequestDTO request) {
        log.info("Processing payment retry for user: {} with payment ID: {}", userId, request.getPaymentId());

        Payment payment = paymentRepository.findByPaymentIdAndOrderUserUserId(request.getPaymentId(), userId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found or unauthorized access"));

        if (payment.getPaymentStatus() != PaymentStatus.FAILED) {
            throw new InvalidPaymentStatusException(
                    String.format("Cannot retry payment with status: %s. Only FAILED payments can be retried.",
                            payment.getPaymentStatus().getDisplayName()));
        }

        Orders order = payment.getOrder();
        
        if (order == null) {
            throw new InvalidCartException("Associated order not found for this payment");
        }

        log.info("Retrying payment for order: {}", order.getOrderId());

        boolean paymentSuccess = simulateMockPayment();

        if (!paymentSuccess) {
            log.warn("Payment retry simulation failed for user: {}, order: {}", userId, order.getOrderId());
            return PaymentResponseDTO.builder()
                    .orderId(order.getOrderId())
                    .paymentStatus(PaymentStatus.FAILED)
                    .orderStatus(order.getOrderStatus())
                    .message("Payment retry failed. Please try again with a different payment method.")
                    .totalAmount(order.getTotalAmount())
                    .build();
        }

        log.info("Payment retry successful for user: {}, order: {}", userId, order.getOrderId());

        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setPaymentDate(LocalDateTime.now());
        paymentRepository.save(payment);

        order.setOrderStatus(OrderStatus.COMPLETED);
        ordersRepository.save(order);

        if (request.getPaymentMethod() != null) {
            payment.setPaymentMethod(request.getPaymentMethod());
            paymentRepository.save(payment);
        }

        for (OrderItem orderItem : order.getOrderItems()) {
            reduceStock(orderItem.getProduct(), orderItem.getQuantity());
        }

        User user = order.getUser();
        Cart cart = cartRepository.findByUserId(user.getUserId()).orElse(null);
        if (cart != null) {
            clearCartItems(cart);
        }

        return buildSuccessPaymentResponse(order, order.getTotalAmount());
    }

    /**
     * Simulate mock payment with 80% success rate
     * 
     * @return true if payment succeeds, false otherwise
     */
    private boolean simulateMockPayment() {
        Random random = new Random();
        double randomValue = random.nextDouble();
        boolean success = randomValue < 0.8;
        log.info("Mock payment simulation: random={}, success={}", randomValue, success);
        return success;
    }
}
