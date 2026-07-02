# Gambaran Project E-Commerce

## 1. Ringkasan Project

Project ini adalah aplikasi e-commerce single vendor berbasis web responsive. Aplikasi ditujukan untuk customer agar dapat melakukan registrasi, login, melihat produk, mencari produk, memfilter produk, melihat detail produk, menambahkan produk ke cart, melakukan checkout, melakukan pembayaran simulasi, melihat riwayat order, mengikuti flash sale, dan menerima notifikasi flash sale.

Project akan dikembangkan dengan arsitektur terpisah antara frontend, backend, dan database.

## 2. Stack Teknologi

### Frontend

- React
- React Router
- Axios
- Context API
- Toast Notification
- Responsive Web Design

### Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven
- Swagger / OpenAPI

### Database

- MySQL

### Version Control

- Git
- GitHub

## 3. Target Platform

Aplikasi frontend akan berupa web responsive yang dapat digunakan melalui browser desktop dan mobile.

## 4. Jenis E-Commerce

Project ini menggunakan konsep single vendor, yaitu toko online milik satu perusahaan atau satu pemilik toko.

## 5. Aktor

| Aktor | Deskripsi |
| --- | --- |
| Customer | Pengguna yang melakukan registrasi, login, melihat produk, berbelanja, melakukan pembayaran, mengikuti flash sale, menerima notifikasi, dan melihat riwayat pesanan. |

Untuk tahap awal, implementasi difokuskan pada customer terlebih dahulu. Fitur admin akan dikerjakan setelah fitur product dan customer flow selesai.

## 6. Scope Customer

Fitur yang termasuk dalam scope customer adalah:

- Register
- Login
- Logout
- Browse Product
- Search Product
- Filter Product
- Product Detail
- Add to Cart
- Update Cart
- Remove Cart Item
- Checkout
- Payment Simulation
- Order History
- Notification Flash Sale

## 7. Authentication

Authentication menggunakan JWT Authentication.

Flow authentication:

1. Customer melakukan register.
2. Customer melakukan login.
3. Backend melakukan validasi credential.
4. Backend menghasilkan JWT token.
5. Frontend menyimpan token.
6. Request yang membutuhkan authentication mengirim token melalui Authorization header.

Endpoint awal:

```http
POST /auth/register
POST /auth/login
```

## 8. Product Catalog

Customer dapat melihat daftar produk, mencari produk, memfilter produk, dan membuka detail produk.

Fitur product catalog:

- Browse product
- Search product berdasarkan keyword
- Filter product berdasarkan kategori atau parameter lain
- Product detail
- Product image
- Product price
- Product stock

Endpoint awal:

```http
GET /products
GET /products/{id}
```

## 9. Shopping Cart

Customer dapat menambahkan produk ke cart, mengubah quantity, menghapus item, dan melihat isi cart.

Fitur cart:

- Add to cart
- View cart
- Update quantity
- Remove item
- Hitung subtotal per item
- Hitung total cart

Endpoint awal:

```http
POST /cart
GET /cart
PUT /cart/items/{id}
DELETE /cart/items/{id}
```

## 10. Checkout Flow

Order flow yang digunakan:

```text
Browse Product
↓
Add to Cart
↓
Checkout
↓
Payment (Mock)
↓
Paid
↓
Processing
↓
Shipped
↓
Completed
```

Status order awal:

- PENDING
- PAID
- PROCESSING
- SHIPPED
- COMPLETED
- CANCELLED

Endpoint awal:

```http
POST /checkout
GET /orders
GET /orders/{id}
```

## 11. Payment Simulation

Payment gateway menggunakan mock/simulation dan tidak terhubung ke payment gateway asli.

Metode pembayaran:

- Bank Transfer
- QRIS
- E-Wallet

Flow payment:

```text
Checkout
↓
Pilih metode pembayaran
↓
Generate Virtual Account / QR Mock / Payment Code
↓
Status payment: UNPAID
↓
Customer klik Pay Now
↓
Status berubah menjadi PAID atau FAILED
```

Status payment:

- UNPAID
- PAID
- FAILED
- EXPIRED

Endpoint awal:

```http
POST /payments/mock
GET /payments/{id}
```

## 12. Flash Sale

Flash sale adalah event promo dengan waktu terbatas, harga khusus, dan stok khusus.

Contoh:

- Product: Laptop
- Harga normal: 15.000.000
- Harga flash sale: 12.000.000
- Mulai: 20.00
- Selesai: 22.00
- Stock flash sale: 30 pcs

Ketika flash sale aktif, frontend menampilkan harga flash sale dan countdown. Ketika waktu flash sale selesai, harga kembali menggunakan harga normal.

Data utama flash sale:

- Nama event
- Waktu mulai
- Waktu selesai
- Daftar produk
- Harga flash sale per produk
- Stock flash sale per produk
- Status aktif/nonaktif

Endpoint awal:

```http
GET /flash-sales
GET /flash-sales/active
```

## 13. Countdown Timer

Countdown timer dihitung di frontend berdasarkan `flashSale.endTime` dari backend.

Contoh tampilan:

```text
02:14:51
```

Frontend akan menghitung sisa waktu secara realtime sampai flash sale selesai.

## 14. Notification

Notification yang digunakan adalah toast notification.

Contoh notifikasi:

```text
Flash Sale Laptop dimulai!
```

Notifikasi digunakan untuk memberi informasi kepada customer, terutama terkait flash sale dan status transaksi.

Fitur notification tahap awal:

- Toast ketika flash sale aktif
- Toast ketika add to cart berhasil
- Toast ketika checkout berhasil
- Toast ketika pembayaran berhasil atau gagal

## 15. Rancangan Database Awal

Tabel minimal yang dibutuhkan:

- users
- roles
- products
- categories
- product_images
- carts
- cart_items
- orders
- order_items
- payments
- flash_sales
- flash_sale_products
- notifications

### Relasi Utama

- users memiliki roles
- users memiliki cart
- cart memiliki cart_items
- cart_items terhubung ke products
- users memiliki orders
- orders memiliki order_items
- order_items terhubung ke products
- orders memiliki payment
- products memiliki category
- products memiliki product_images
- flash_sales memiliki flash_sale_products
- flash_sale_products terhubung ke products
- users memiliki notifications

## 16. Rancangan REST API Awal

### Auth

```http
POST /auth/register
POST /auth/login
```

### Products

```http
GET /products
GET /products/{id}
```

### Cart

```http
POST /cart
GET /cart
PUT /cart/items/{id}
DELETE /cart/items/{id}
```

### Checkout

```http
POST /checkout
```

### Orders

```http
GET /orders
GET /orders/{id}
```

### Payments

```http
POST /payments/mock
GET /payments/{id}
```

### Flash Sales

```http
GET /flash-sales
GET /flash-sales/active
```

## 17. Struktur Project Frontend

Rencana struktur frontend:

```text
src/
├── pages
├── components
├── hooks
├── services
├── layouts
├── routes
├── contexts
├── utils
└── assets
```

Penjelasan singkat:

- `pages`: halaman utama aplikasi
- `components`: komponen reusable
- `hooks`: custom hooks
- `services`: komunikasi API menggunakan Axios
- `layouts`: layout halaman
- `routes`: konfigurasi routing
- `contexts`: global state menggunakan Context API
- `utils`: helper function
- `assets`: gambar dan aset statis

## 18. Struktur Project Backend

Rencana struktur backend:

```text
src/main/java
├── config
├── controller
├── service
├── repository
├── entity
├── dto
├── mapper
├── security
├── exception
└── util
```

Penjelasan singkat:

- `config`: konfigurasi aplikasi
- `controller`: REST controller
- `service`: business logic
- `repository`: akses database
- `entity`: representasi tabel database
- `dto`: request dan response object
- `mapper`: mapping entity dan DTO
- `security`: JWT dan Spring Security
- `exception`: error handling
- `util`: utility helper

## 19. Urutan Implementasi Bertahap

Urutan implementasi yang disarankan:

1. Dokumentasi gambaran project
2. Setup backend Spring Boot
3. Setup frontend React
4. Setup database MySQL
5. Implementasi authentication JWT
6. Implementasi product catalog
7. Implementasi shopping cart
8. Implementasi checkout
9. Implementasi mock payment
10. Implementasi order history
11. Implementasi flash sale
12. Implementasi countdown timer
13. Implementasi toast notification
14. Integrasi frontend dan backend
15. Testing dan perbaikan flow

## 20. Catatan Implementasi

- Fokus awal adalah fitur customer.
- Admin panel belum masuk tahap awal.
- Payment menggunakan mock gateway.
- Notification menggunakan toast.
- Flash sale harus mempertimbangkan waktu aktif, stok terbatas, dan harga khusus.
- Struktur database harus dijaga agar mendukung pengembangan fitur admin di tahap berikutnya.
- Backend dibuat dengan pendekatan REST API yang rapi dan mendekati production.
- Frontend harus responsive untuk desktop dan mobile browser.
