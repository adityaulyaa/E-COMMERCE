package com.ecommerce.repository;

import com.ecommerce.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserUserId(Long userId);
    Optional<Address> findByUserUserIdAndAddressId(Long userId, Long addressId);
    Optional<Address> findByUserUserIdAndIsDefaultTrue(Long userId);
}
