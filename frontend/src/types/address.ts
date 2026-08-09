export interface Address {
    addressId: number;
    label: string;
    recipientName: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AddressFormData {
    label: string;
    recipientName: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    isDefault?: boolean;
}
