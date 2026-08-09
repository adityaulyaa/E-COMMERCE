import apiClient from './apiClient';
import { Address, AddressFormData } from '../types/address';

const ADDRESS_BASE_URL = '/addresses';

const addressService = {
    getAddresses: async (): Promise<Address[]> => {
        const response = await apiClient.get<Address[]>(ADDRESS_BASE_URL);
        return response.data;
    },

    createAddress: async (data: AddressFormData): Promise<Address> => {
        const response = await apiClient.post<Address>(ADDRESS_BASE_URL, data);
        return response.data;
    },

    updateAddress: async (addressId: number, data: AddressFormData): Promise<Address> => {
        const response = await apiClient.put<Address>(`${ADDRESS_BASE_URL}/${addressId}`, data);
        return response.data;
    },

    deleteAddress: async (addressId: number): Promise<void> => {
        await apiClient.delete(`${ADDRESS_BASE_URL}/${addressId}`);
    },

    setDefaultAddress: async (addressId: number): Promise<Address> => {
        const response = await apiClient.put<Address>(`${ADDRESS_BASE_URL}/${addressId}/default`);
        return response.data;
    },
};

export default addressService;
