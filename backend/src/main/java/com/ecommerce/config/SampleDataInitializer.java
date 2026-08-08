package com.ecommerce.config;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductImage;
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
            log.info("Database is empty. Inserting sample product data with images...");

            List<Product> products = Arrays.asList(
                    createProduct(
                            "Sony WH-1000XM5",
                            "Premium wireless headphones with industry-leading noise cancellation",
                            new BigDecimal("349.00"),
                            15,
                            "Electronics",
                            new BigDecimal("4.20"),
                            150,
                            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "Minimalist Ceramic Pot",
                            "Beautiful ceramic planter for indoor plants and succulents",
                            new BigDecimal("24.00"),
                            40,
                            "Home & Living",
                            new BigDecimal("3.50"),
                            80,
                            "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1578482292626-5a6f20db87f8?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "Leather Backpack",
                            "Durable brown leather backpack for everyday use and travel",
                            new BigDecimal("59.00"),
                            20,
                            "Fashion",
                            new BigDecimal("4.10"),
                            120,
                            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1553652202-26f78d5b5a22?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1546025080-7bab993d3092?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "The Ordinary Niacinamide 10%",
                            "Skincare serum for clear, smooth skin and reduced pore appearance",
                            new BigDecimal("12.00"),
                            50,
                            "Beauty",
                            new BigDecimal("2.90"),
                            250,
                            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1596462502278-af396edbc6a0?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "Nike Air Force 1 '07",
                            "Classic white sneakers - timeless style for everyday wear",
                            new BigDecimal("99.00"),
                            25,
                            "Fashion",
                            new BigDecimal("4.30"),
                            300,
                            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1470295046666-6174a78c376e?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "Apple Watch Series 9",
                            "Advanced smartwatch with health tracking and fitness features",
                            new BigDecimal("399.00"),
                            10,
                            "Electronics",
                            new BigDecimal("4.85"),
                            180,
                            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "Atomic Habits",
                            "Self-help book by James Clear about building tiny habits for success",
                            new BigDecimal("16.00"),
                            60,
                            "Books",
                            new BigDecimal("4.90"),
                            500,
                            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "Acacia Wood Cutting Board",
                            "Natural wood cutting board - perfect for kitchen prep and serving",
                            new BigDecimal("39.00"),
                            30,
                            "Home & Living",
                            new BigDecimal("3.80"),
                            90,
                            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "Minimalist Ceramic Vase",
                            "Elegant ceramic vase - perfect for displaying fresh or dried flowers",
                            new BigDecimal("29.00"),
                            35,
                            "Home & Living",
                            new BigDecimal("1.50"),
                            60,
                            "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "Canon EOS R50",
                            "Mirrorless camera for photography enthusiasts and professionals",
                            new BigDecimal("749.00"),
                            5,
                            "Electronics",
                            new BigDecimal("4.88"),
                            70,
                            "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "Scented Candle",
                            "Aromatherapy candle with natural fragrance for relaxation",
                            new BigDecimal("18.00"),
                            45,
                            "Beauty",
                            new BigDecimal("1.80"),
                            200,
                            "https://images.unsplash.com/photo-1602874801006-22209aca0653?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop"
                    ),
                    createProduct(
                            "New York Cap",
                            "Classic baseball cap with embroidered New York logo",
                            new BigDecimal("25.00"),
                            55,
                            "Fashion",
                            new BigDecimal("2.50"),
                            110,
                            "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop",
                            "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500&h=500&fit=crop"
                    )
            );

            productRepository.saveAll(products);
            log.info("Successfully inserted {} sample products with images", products.size());
        } else {
            log.info("Database already contains products. Skipping sample data initialization.");
        }
    }

    private Product createProduct(String name, String description, BigDecimal price, Integer stock,
                                   String category, BigDecimal rating, Integer soldCount, String... imageUrls) {
        Product product = Product.builder()
                .name(name)
                .description(description)
                .price(price)
                .stock(stock)
                .category(category)
                .rating(rating)
                .soldCount(soldCount)
                .build();

        int order = 1;
        for (String imageUrl : imageUrls) {
            ProductImage image = ProductImage.builder()
                    .imageUrl(imageUrl)
                    .displayOrder(order++)
                    .product(product)
                    .build();
            product.getImages().add(image);
        }

        return product;
    }
}
