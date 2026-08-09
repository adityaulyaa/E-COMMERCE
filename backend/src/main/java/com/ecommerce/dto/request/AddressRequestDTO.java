package com.ecommerce.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressRequestDTO {

    @NotBlank(message = "Label cannot be empty")
    @Size(max = 100, message = "Label cannot exceed 100 characters")
    private String label;

    @NotBlank(message = "Recipient name cannot be empty")
    @Size(max = 255, message = "Recipient name cannot exceed 255 characters")
    private String recipientName;

    @NotBlank(message = "Phone number cannot be empty")
    @Size(max = 20, message = "Phone number cannot exceed 20 characters")
    @Pattern(regexp = "^\\+?[0-9.()-]{7,20}$", message = "Invalid phone number format")
    private String phoneNumber;

    @NotBlank(message = "Street address cannot be empty")
    private String streetAddress;

    @NotBlank(message = "City cannot be empty")
    @Size(max = 100, message = "City cannot exceed 100 characters")
    private String city;

    @NotBlank(message = "Province cannot be empty")
    @Size(max = 100, message = "Province cannot exceed 100 characters")
    private String province;

    @NotBlank(message = "Postal code cannot be empty")
    @Size(max = 10, message = "Postal code cannot exceed 10 characters")
    private String postalCode;

    private Boolean isDefault;
}
