package com.ecommerce.config;

import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class SampleDataInitializer {

    private final ProductRepository productRepository;

    @PostConstruct
    public void initSampleData() {
        if (productRepository.count() == 0) {
            log.info("Database is empty. Inserting sample product data...");

            List<Product> products = Arrays.asList(
                    Product.builder()
                            .name("Sony WH-1000XM5")
                            .description("Premium wireless headphones with industry-leading noise cancellation")
                            .price(new BigDecimal("349.00"))
                            .stock(15)
                            .category("Electronics")
                            .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.80"))
                            .build(),
                    Product.builder()
                            .name("Minimalist Ceramic Pot")
                            .description("Beautiful ceramic planter for indoor plants and succulents")
                            .price(new BigDecimal("24.00"))
                            .stock(40)
                            .category("Home & Living")
                            .imageUrl("https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.50"))
                            .build(),
                    Product.builder()
                            .name("Leather Backpack")
                            .description("Durable brown leather backpack for everyday use and travel")
                            .price(new BigDecimal("59.00"))
                            .stock(20)
                            .category("Fashion")
                            .imageUrl("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.70"))
                            .build(),
                    Product.builder()
                            .name("The Ordinary Niacinamide 10%")
                            .description("Skincare serum for clear, smooth skin and reduced pore appearance")
                            .price(new BigDecimal("12.00"))
                            .stock(50)
                            .category("Beauty")
                            .imageUrl("https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.60"))
                            .build(),
                    Product.builder()
                            .name("Nike Air Force 1 '07")
                            .description("Classic white sneakers - timeless style for everyday wear")
                            .price(new BigDecimal("99.00"))
                            .stock(25)
                            .category("Fashion")
                            .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.75"))
                            .build(),
                    Product.builder()
                            .name("Apple Watch Series 9")
                            .description("Advanced smartwatch with health tracking and fitness features")
                            .price(new BigDecimal("399.00"))
                            .stock(10)
                            .category("Electronics")
                            .imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.85"))
                            .build(),
                    Product.builder()
                            .name("Atomic Habits")
                            .description("Self-help book by James Clear about building tiny habits for success")
                            .price(new BigDecimal("16.00"))
                            .stock(60)
                            .category("Books")
                            .imageUrl("https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.90"))
                            .build(),
                    Product.builder()
                            .name("Acacia Wood Cutting Board")
                            .description("Natural wood cutting board - perfect for kitchen prep and serving")
                            .price(new BigDecimal("39.00"))
                            .stock(30)
                            .category("Home & Living")
                            .imageUrl("https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.55"))
                            .build(),
                    Product.builder()
                            .name("Minimalist Ceramic Vase")
                            .description("Elegant ceramic vase - perfect for displaying fresh or dried flowers")
                            .price(new BigDecimal("29.00"))
                            .stock(35)
                            .category("Home & Living")
                            .imageUrl("https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.65"))
                            .build(),
                    Product.builder()
                            .name("Canon EOS R50")
                            .description("Mirrorless camera for photography enthusiasts and professionals")
                            .price(new BigDecimal("749.00"))
                            .stock(5)
                            .category("Electronics")
                            .imageUrl("https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.88"))
                            .build(),
                    Product.builder()
                            .name("Scented Candle")
                            .description("Aromatherapy candle with natural fragrance for relaxation")
                            .price(new BigDecimal("18.00"))
                            .stock(45)
                            .category("Beauty")
                            .imageUrl("https://images.unsplash.com/photo-1602874801006-22209aca0653?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.40"))
                            .build(),
                    Product.builder()
                            .name("New York Cap")
                            .description("Classic baseball cap with embroidered New York logo")
                            .price(new BigDecimal("25.00"))
                            .stock(55)
                            .category("Fashion")
                            .imageUrl("https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop")
                            .rating(new BigDecimal("4.58"))
                            .build()
            );

            productRepository.saveAll(products);
            log.info("Successfully inserted {} sample products", products.size());
        } else {
            log.info("Database already contains products. Skipping sample data initialization.");
        }
    }
}
