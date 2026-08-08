package com.ecommerce.config;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductImage;
import com.ecommerce.entity.Review; // NEW
import com.ecommerce.entity.User; // NEW
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.ReviewRepository; // NEW
import com.ecommerce.repository.UserRepository; // NEW
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder; // NEW
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class SampleDataInitializer {

    private final ProductRepository productRepository;
    private final UserRepository userRepository; // NEW
    private final ReviewRepository reviewRepository; // NEW
    private final PasswordEncoder passwordEncoder; // NEW

    // Comment lists for reviews
    private final List<String> positiveComments = Arrays.asList(
            "Produk ini luar biasa, sangat direkomendasikan!",
            "Kualitas fantastis, melebihi ekspektasi saya. Sangat puas!",
            "Wajib punya! Desainnya keren dan fungsinya sempurna.",
            "Pengalaman berbelanja terbaik, produk tiba dengan cepat dan kondisi prima.",
            "Bintang 5! Saya pasti akan membeli lagi."
    );

    private final List<String> neutralComments = Arrays.asList(
            "Lumayan bagus, melakukan apa yang seharusnya.",
            "Produk standar, tidak ada yang istimewa tapi juga tidak mengecewakan.",
            "Cukup baik, tapi ada sedikit yang bisa ditingkatkan.",
            "Sesuai harga, kualitasnya oke.",
            "Tidak buruk, tidak bagus, pas-pasan."
    );

    private final List<String> negativeComments = Arrays.asList(
            "Sangat mengecewakan. Kualitasnya buruk.",
            "Tidak sesuai dengan deskripsi, saya merasa tertipu.",
            "Uang terbuang sia-sia. Jangan beli produk ini.",
            "Banyak masalah sejak pertama kali digunakan. Sangat frustasi.",
            "Sangat tidak direkomendasikan. Jauh dari ekspektasi."
    );

    @PostConstruct
    public void initSampleData() {
        if (productRepository.count() == 0) {
            log.info("Database is empty. Inserting sample product data with images...");

            List<Product> products = Arrays.asList(
                    createProduct(
                            "Minimalist Ceramic Vase",
                            "Elegant ceramic vase - perfect for displaying fresh or dried flowers",
                            new BigDecimal("29.00"),
                            35,
                            "Home & Living",
                            new BigDecimal("1.50"),
                            60,
                            "https://p19-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/img/VqbcmM/2023/3/16/6614cd05-ec1c-49ee-badd-a266ed27c655.jpg~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1786181285&x-signature=%2Bn49y4K3P73V84ygPXMz7FuTaT8%3D&x-signature-webp=Jyqm9P3CUeYv80XOULWnlpKCErY%3D",
                            "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/img/VqbcmM/2023/3/16/36f9a5f7-b170-458c-b028-62e4b9d36fb5.jpg~tplv-aphluv4xwc-resize-jpeg:700:0.jpeg?lk3s=0ccea506&x-expires=1786181285&x-signature=QP2i5O%2F0vOl90wcrIg2oxN4VZyo%3D&x-signature-webp=I%2BZ1qTMemfYLx%2B7oGc1Qch60xnI%3D"
                    ),

                    createProduct(
                            "Minimalist Ceramic Pot",
                            "Beautiful ceramic planter for indoor plants and succulents",
                            new BigDecimal("24.00"),
                            40,
                            "Home & Living",
                            new BigDecimal("3.50"),
                            80,
                            "https://www.letifly.com/cdn/shop/products/Imprint-Painted-Ceramic-Planters.jpg?v=1741128892&width=750",
                            "https://www.letifly.com/cdn/shop/products/Imprint-Painted-Ceramic-Planters-3.jpg?v=1741128896&width=750"
                    ),
                    createProduct(
                            "Atomic Habits",
                            "Self-help book by James Clear about building tiny habits for success",
                            new BigDecimal("16.00"),
                            60,
                            "Books",
                            new BigDecimal("4.90"),
                            500,
                            "https://images.squarespace-cdn.com/content/v1/59c82ac46f4ca30b86d179bf/1706362642426-BI3J8PJ5LRJNO8H7WFV4/119.bookreview.AtomicHabits.jpg",
                            "https://cdn.shopify.com/s/files/1/0194/2855/files/atomic-habits_600x600.jpg?v=1624825894"
                    ),
                    createProduct(
                            "Acacia Wood Cutting Board",
                            "Natural wood cutting board - perfect for kitchen prep and serving",
                            new BigDecimal("39.00"),
                            30,
                            "Home & Living",
                            new BigDecimal("3.80"),
                            90,
                            "https://seidoknives.com/cdn/shop/files/AcaciaEndGrainCuttingBoarduprightdisplay_750x750.jpg?v=1762439984",
                            "https://seidoknives.com/cdn/shop/files/AcaciaEndGrainCuttingBoardwithingredients_1500x1500.jpg?v=1745812753",
                            "https://seidoknives.com/cdn/shop/files/AcaciaEndGrainCuttingBoard_min_1500_750x750.jpg?v=1745812753"
                    ),
                    createProduct(
                            "The Ordinary Niacinamide 10%",
                            "Skincare serum for clear, smooth skin and reduced pore appearance",
                            new BigDecimal("12.00"),
                            50,
                            "Beauty",
                            new BigDecimal("2.90"),
                            250,
                            "https://m.media-amazon.com/images/I/71EbtHYHksL._SX425_.jpg",
                            "https://m.media-amazon.com/images/I/71iJ5+9mCAL._SL1500_.jpg"
                    ),
                    createProduct(
                            "Nike Air Force 1 '07",
                            "Classic white sneakers - timeless style for everyday wear",
                            new BigDecimal("99.00"),
                            25,
                            "Fashion",
                            new BigDecimal("4.30"),
                            300,
                            "https://down-id.img.susercontent.com/file/id-11134207-822wg-mnnyfhut6n7mf6@resize_w450_nl.webp",
                            "https://down-id.img.susercontent.com/file/sg-11134201-7rdwq-lyres1lpawhybb.webp",
                            "https://down-id.img.susercontent.com/file/sg-11134201-7rdwk-lyres1wiv2fa7b.webp"
                    ),
                    createProduct(
                            "Apple Watch Series 9",
                            "Advanced smartwatch with health tracking and fitness features",
                            new BigDecimal("399.00"),
                            10,
                            "Electronics",
                            new BigDecimal("4.85"),
                            180,
                            "https://www.notebookcheck.net/fileadmin/_processed_/a/0/csm_Apple-Watch-9-Intro_41b1be09a9.jpg",
                            "https://cdnpro.eraspace.com/media/catalog/product/a/p/apple_watch_series_9_41mm_gps_pink_aluminium_case_with_light_pink_sport_band_7.jpg"
                    ),
                    createProduct(
                            "Scented Candle",
                            "Aromatherapy candle with natural fragrance for relaxation",
                            new BigDecimal("18.00"),
                            45,
                            "Beauty",
                            new BigDecimal("1.80"),
                            200,
                            "https://lovery.com/cdn/shop/files/117.jpg?v=1699389581&width=1100",
                            "https://lovery.com/cdn/shop/files/24FJ020_f7be116e-a689-4d79-afc1-1ec6271fa74c.jpg?v=1699389580&width=1100"
                    ),
                    createProduct(
                            "Sony WH-1000XM5",
                            "Premium wireless headphones with industry-leading noise cancellation",
                            new BigDecimal("349.00"),
                            15,
                            "Electronics",
                            new BigDecimal("4.20"),
                            150,
                            "https://ngshope.com/wp-content/uploads/2024/07/id-11134207-7r98v-lvshh46bvy1i4d.jpg",
                            "https://www.jbhifi.com.au/cdn/shop/files/788394-Product-0-I-638622289805265363_54ff4e8a-48ae-4832-a29f-ca6438d12e5a.jpg?v=1774562828",
                            "https://www.jbhifi.com.au/cdn/shop/files/592551-Product-0-I-637878553977254838.jpg?v=1774562838"
                    ),
                    createProduct(
                            "Canon EOS R50",
                            "Mirrorless camera for photography enthusiasts and professionals",
                            new BigDecimal("749.00"),
                            5,
                            "Electronics",
                            new BigDecimal("4.88"),
                            70,
                            "https://imgcache.dealmoon.com/thumbimg.dealmoon.com/uk2506/dealmoon/2c1/308/79d/a20bbc096625021cd630f6cx450x450x47.jpg_480_0_3_3a56.jpg",
                            "https://m.media-amazon.com/images/I/71eCYxIBTcL._AC_SX355_.jpg",
                            "https://m.media-amazon.com/images/I/71ANGtyZRzL._AC_SX300_SY300_QL70_FMwebp_.jpg"
                    ),
                    createProduct(
                            "Leather Backpack",
                            "Durable brown leather backpack for everyday use and travel",
                            new BigDecimal("59.00"),
                            20,
                            "Fashion",
                            new BigDecimal("4.10"),
                            120,
                            "https://m.media-amazon.com/images/I/81bD0h9GvOL._AC_SL1500_.jpg",
                            "https://m.media-amazon.com/images/I/71vGkhbaXmL._AC_SL1500_.jpg",
                            "https://m.media-amazon.com/images/I/71MqiKLPv8L._AC_SL1500_.jpg"
                    ),
                    createProduct(
                            "New York Cap",
                            "Classic baseball cap with embroidered New York logo",
                            new BigDecimal("25.00"),
                            55,
                            "Fashion",
                            new BigDecimal("2.50"),
                            110,
                            "https://down-id.img.susercontent.com/file/id-11134207-81ztf-mfi2e26j7vv152@resize_w450_nl.webp",
                            "https://down-id.img.susercontent.com/file/id-11134207-81zti-mfi2e26q33tab2.webp"
                    )
            );

            productRepository.saveAll(products);
            log.info("Successfully inserted {} sample products with images", products.size());

            // Create reviewer user if not exists
            User reviewerUser = userRepository.findByEmail("reviewer@aladin.com").orElseGet(() -> {
                User newUser = User.builder()
                        .fullName("Reviewer Aladin")
                        .email("reviewer@aladin.com")
                        .password(passwordEncoder.encode("password"))
                        .build();
                log.info("Creating dummy reviewer user: {}", newUser.getEmail());
                return userRepository.save(newUser);
            });

            // Insert sample reviews for each product with specific ratings
            insertSampleReviews(products, reviewerUser);

            log.info("Successfully inserted sample reviews for {} products.", products.size());
        } else {
            log.info("Database already contains products. Skipping sample data initialization.");
        }
    }

    private void insertSampleReviews(List<Product> products, User reviewerUser) {
        log.info("Inserting sample reviews for products...");

        // Minimalist Ceramic Pot: rating 3.6 (e.g., 3, 4, 3, 5, 3 -> avg 3.6)
        Product p1 = products.stream().filter(p -> p.getName().equals("Minimalist Ceramic Vase")).findFirst().orElse(null);
        if (p1 != null) {
            createReview(p1, reviewerUser, 3, neutralComments.get(0));
            createReview(p1, reviewerUser, 4, positiveComments.get(1));
            createReview(p1, reviewerUser, 3, neutralComments.get(1));
            createReview(p1, reviewerUser, 5, positiveComments.get(0));
            createReview(p1, reviewerUser, 3, neutralComments.get(2));
        }

        // Atomic Habits: rating 5 (e.g., 5, 5, 5)
        Product p2 = products.stream().filter(p -> p.getName().equals("Atomic Habits")).findFirst().orElse(null);
        if (p2 != null) {
            createReview(p2, reviewerUser, 5, positiveComments.get(0));
            createReview(p2, reviewerUser, 5, positiveComments.get(2));
            createReview(p2, reviewerUser, 5, positiveComments.get(1));
        }

        // Acacia Wood Cutting Board: rating 4.3 (e.g., 4, 5, 4)
        Product p3 = products.stream().filter(p -> p.getName().equals("Acacia Wood Cutting Board")).findFirst().orElse(null);
        if (p3 != null) {
            createReview(p3, reviewerUser, 4, positiveComments.get(3));
            createReview(p3, reviewerUser, 5, positiveComments.get(1));
            createReview(p3, reviewerUser, 4, positiveComments.get(4));
        }

        // The Ordinary Niacinamide 10%: rating 4.6
        Product p4 = products.stream().filter(p -> p.getName().equals("The Ordinary Niacinamide 10%")).findFirst().orElse(null);
        if (p4 != null) {
            createReview(p4, reviewerUser, 5, positiveComments.get(0));
            createReview(p4, reviewerUser, 4, positiveComments.get(3));
            createReview(p4, reviewerUser, 5, positiveComments.get(2));
        }

        // Nike Air Force 1 '07: rating 4.9
        Product p5 = products.stream().filter(p -> p.getName().equals("Nike Air Force 1 '07")).findFirst().orElse(null);
        if (p5 != null) {
            createReview(p5, reviewerUser, 5, positiveComments.get(0));
            createReview(p5, reviewerUser, 5, positiveComments.get(1));
            createReview(p5, reviewerUser, 5, positiveComments.get(2));
            createReview(p5, reviewerUser, 5, positiveComments.get(4));
        }

        // Apple Watch Series 9: rating 4.8
        Product p6 = products.stream().filter(p -> p.getName().equals("Apple Watch Series 9")).findFirst().orElse(null);
        if (p6 != null) {
            createReview(p6, reviewerUser, 5, positiveComments.get(0));
            createReview(p6, reviewerUser, 5, positiveComments.get(1));
            createReview(p6, reviewerUser, 5, positiveComments.get(2));
            createReview(p6, reviewerUser, 4, positiveComments.get(3));
        }

        // Scented Candle: rating 1.3
        Product p7 = products.stream().filter(p -> p.getName().equals("Scented Candle")).findFirst().orElse(null);
        if (p7 != null) {
            createReview(p7, reviewerUser, 1, negativeComments.get(0));
            createReview(p7, reviewerUser, 1, negativeComments.get(2));
            createReview(p7, reviewerUser, 2, neutralComments.get(2));
        }

        // Sony WH-1000XM5: rating 3.4
        Product p8 = products.stream().filter(p -> p.getName().equals("Sony WH-1000XM5")).findFirst().orElse(null);
        if (p8 != null) {
            createReview(p8, reviewerUser, 3, neutralComments.get(0));
            createReview(p8, reviewerUser, 4, positiveComments.get(3));
            createReview(p8, reviewerUser, 3, neutralComments.get(1));
        }

        // Canon EOS R50: rating 4.1
        Product p9 = products.stream().filter(p -> p.getName().equals("Canon EOS R50")).findFirst().orElse(null);
        if (p9 != null) {
            createReview(p9, reviewerUser, 4, positiveComments.get(4));
            createReview(p9, reviewerUser, 5, positiveComments.get(0));
            createReview(p9, reviewerUser, 3, neutralComments.get(1));
        }

        // Leather Backpack: rating 2.8
        Product p10 = products.stream().filter(p -> p.getName().equals("Leather Backpack")).findFirst().orElse(null);
        if (p10 != null) {
            createReview(p10, reviewerUser, 3, neutralComments.get(0));
            createReview(p10, reviewerUser, 2, negativeComments.get(1));
            createReview(p10, reviewerUser, 3, neutralComments.get(2));
        }

        // New York Cap: rating 2.9
        Product p11 = products.stream().filter(p -> p.getName().equals("New York Cap")).findFirst().orElse(null);
        if (p11 != null) {
            createReview(p11, reviewerUser, 3, neutralComments.get(0));
            createReview(p11, reviewerUser, 2, negativeComments.get(1));
            createReview(p11, reviewerUser, 3, neutralComments.get(2));
        }

        // Minimalist Ceramic Vase: rating 4.5
        Product p12 = products.stream().filter(p -> p.getName().equals("Minimalist Ceramic Vase")).findFirst().orElse(null);
        if (p12 != null) {
            createReview(p12, reviewerUser, 5, positiveComments.get(0));
            createReview(p12, reviewerUser, 4, positiveComments.get(3));
            createReview(p12, reviewerUser, 5, positiveComments.get(2));
        }
    }

    private Review createReview(Product product, User user, Integer rating, String comment) {
        Review review = Review.builder()
                .product(product)
                .user(user)
                .rating(rating)
                .comment(comment)
                .build();
        return reviewRepository.save(review);
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
