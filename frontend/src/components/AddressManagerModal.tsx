import { useState } from 'react'
import { Address } from '../types/address'
import addressService from '../services/addressService'

interface Props {
  isOpen: boolean
  onClose: () => void
  addresses: Address[]
  onUpdate: () => void
  selectedAddressId: number | null
  onSelect: (addressId: number) => void
}

export default function AddressManagerModal({ isOpen, onClose, addresses, onUpdate, selectedAddressId, onSelect }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  if (!isOpen) return null

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      await addressService.deleteAddress(id)
      onUpdate()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isFormOpen ? (editingAddress ? 'Edit Address' : 'Add New Address') : 'Manage Addresses'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {isFormOpen ? (
          <form onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const data = {
              label: formData.get('label') as string,
              recipientName: formData.get('recipientName') as string,
              phoneNumber: formData.get('phoneNumber') as string,
              streetAddress: formData.get('streetAddress') as string,
              city: formData.get('city') as string,
              province: formData.get('province') as string,
              postalCode: formData.get('postalCode') as string,
              isDefault: formData.get('isDefault') === 'on'
            }
            if (editingAddress) {
              await addressService.updateAddress(editingAddress.addressId, data)
            } else {
              await addressService.createAddress(data)
            }
            onUpdate()
            setIsFormOpen(false)
            setEditingAddress(null)
          }} className="space-y-4">
            {/* Simple form fields - in a real app, use a proper form library */}
            <input name="label" placeholder="Label (e.g., Home)" required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:dark:text-gray-400" defaultValue={editingAddress?.label} />
            <input name="recipientName" placeholder="Recipient Name" required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:dark:text-gray-400" defaultValue={editingAddress?.recipientName} />
            <input name="phoneNumber" placeholder="Phone Number" required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:dark:text-gray-400" defaultValue={editingAddress?.phoneNumber} />
            <input name="streetAddress" placeholder="Street Address" required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:dark:text-gray-400" defaultValue={editingAddress?.streetAddress} />
            <div className="grid grid-cols-2 gap-2">
              <input name="city" placeholder="City" required className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:dark:text-gray-400" defaultValue={editingAddress?.city} />
              <input name="province" placeholder="Province" required className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:dark:text-gray-400" defaultValue={editingAddress?.province} />
            </div>
            <input name="postalCode" placeholder="Postal Code" required className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 placeholder:dark:text-gray-400" defaultValue={editingAddress?.postalCode} />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isDefault" defaultChecked={editingAddress?.isDefault} /> Set as default
            </label>
            <button type="submit" className="w-full bg-amber-600 text-white p-2 rounded">Save Address</button>
          </form>
        ) : (
          <div className="space-y-4">
            {addresses.map(addr => (
              <div key={addr.addressId} className={`border p-4 rounded flex justify-between items-center dark:border-gray-600 ${selectedAddressId === addr.addressId ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20' : 'dark:bg-gray-700'}`}>
                <div>
                  <p className="font-bold dark:text-white">{addr.label}</p>
                  <p className="text-sm dark:text-gray-300">{addr.recipientName} - {addr.streetAddress}, {addr.city}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onSelect(addr.addressId)} className="text-xs bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-2 py-1 rounded">Select</button>
                  <button onClick={() => { setEditingAddress(addr); setIsFormOpen(true) }} className="text-amber-600 dark:text-amber-500">Edit</button>
                  <button onClick={() => handleDelete(addr.addressId)} className="text-red-600 dark:text-red-500">Delete</button>
                </div>
              </div>
            ))}
            <button onClick={() => setIsFormOpen(true)} className="w-full border-2 border-dashed p-4 rounded text-gray-500 dark:text-gray-400 dark:border-gray-600">
              + Add New Address
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
