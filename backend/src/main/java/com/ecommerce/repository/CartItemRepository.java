package com.ecommerce.repository;

import com.ecommerce.entity.CartItem;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @EntityGraph(attributePaths = {"product", "product.images"})
    @Query("SELECT DISTINCT ci FROM CartItem ci WHERE ci.cart.cartId = :cartId ORDER BY ci.createdAt ASC")
    List<CartItem> findByCartId(@Param("cartId") Long cartId);

    @EntityGraph(attributePaths = {"product"})
    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.cartId = :cartId AND ci.product.productId = :productId")
    Optional<CartItem> findByCartIdAndProductId(
            @Param("cartId") Long cartId,
            @Param("productId") Long productId
    );
}
