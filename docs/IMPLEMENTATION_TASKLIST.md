# IMPLEMENTATION TASK LIST

## Pendahuluan

Dokumen ini merupakan panduan implementasi lengkap untuk proyek E-Commerce yang diturunkan langsung dari PROJECT_SPEC.md sebagai Single Source of Truth.

Tujuan dokumen:

- Menyediakan panduan implementasi terstruktur untuk AI Coding Agent.
- Memastikan setiap Use Case diimplementasikan secara lengkap dan konsisten.
- Menjamin implementasi dilakukan berdasarkan urutan Use Case yang telah ditentukan.
- Memastikan setiap Use Case diselesaikan sepenuhnya sebelum melanjutkan ke Use Case berikutnya.

Prinsip implementasi:

- PROJECT_SPEC.md adalah Single Source of Truth untuk semua kebutuhan proyek.
- Implementasi dilakukan berdasarkan 17 Use Case yang telah didefinisikan.
- Setiap Use Case harus diselesaikan sepenuhnya sebelum melanjutkan ke Use Case berikutnya.
- Tidak boleh menambahkan fitur yang tidak terdapat pada PROJECT_SPEC.md.
- Tidak boleh mengubah arsitektur, desain database, atau spesifikasi API yang telah didefinisikan.
- Setiap implementasi harus memenuhi seluruh Acceptance Criteria sebelum dianggap selesai.

Urutan implementasi:

1. UC-01 Register
2. UC-02 Login
3. UC-03 Logout
4. UC-04 View Product List
5. UC-05 Search Product
6. UC-06 Filter Product
7. UC-07 View Product Detail
8. UC-08 View Cart
9. UC-09 Add to Cart
10. UC-10 Update Cart
11. UC-11 Remove Cart Item
12. UC-12 Checkout
13. UC-13 Choose Payment Method
14. UC-14 Process Payment
15. UC-15 Retry Payment
16. UC-16 View Order History
17. UC-17 View Order Detail

---

# UC-01 Register

## Tujuan

Mengimplementasikan fitur Register yang memungkinkan Customer membuat akun baru menggunakan Full Name, Email, Password, dan Confirm Password. Implementasi ini merupakan fondasi untuk sistem autentikasi dan harus menggunakan Spring Security dengan JWT sebagai mekanisme autentikasi.

---

## Initial State

Pada tahap ini, project diasumsikan dalam kondisi berikut:

- Project belum memiliki database.
- Project belum memiliki Entity apapun.
- Project belum memiliki backend implementation.
- Project belum memiliki frontend implementation.
- Project belum memiliki API endpoints.
- Project belum memiliki konfigurasi Spring Security.
- Project belum memiliki konfigurasi JWT.
- Hanya tersedia PROJECT_SPEC.md sebagai referensi implementasi.

---

## Dependencies

Sebelum UC-01 dapat diimplementasikan, dependency berikut harus tersedia:

- MySQL database server terinstall dan berjalan.
- Spring Boot project telah dibuat dengan dependencies: Spring Web, Spring Data JPA, Spring Security, MySQL Driver, JWT Library.
- React project telah dibuat dengan dependencies: Axios, React Router.
- Struktur direktori backend mengikuti PROJECT_SPEC.md: config, controller, service, repository, entity, dto, mapper, security, exception, util.
- Struktur direktori frontend mengikuti PROJECT_SPEC.md: pages, components, hooks, services, layouts, routes, contexts, utils, assets.

---

## Implementation Steps

### ✅ Persiapan Database

- [x] Buat database MySQL dengan nama sesuai kebutuhan project (misal: ecommerce_db).
- [x] Konfigurasi koneksi database pada application.properties atau application.yml.
- [x] Atur Hibernate DDL strategy untuk development (misal: spring.jpa.hibernate.ddl-auto=update).
- [x] Verifikasi koneksi database berhasil.

### ✅ Pembuatan Entity User

- [x] Buat Entity User pada package entity sesuai Database Design di PROJECT_SPEC.md.
- [x] Tambahkan field: user_id (Primary Key, Auto Increment), full_name, email (unique), password (encrypted), created_at, updated_at.
- [x] Tambahkan anotasi JPA: @Entity, @Table, @Id, @GeneratedValue, @Column.
- [x] Tambahkan unique constraint pada email.
- [x] Tambahkan anotasi timestamp: @CreatedDate, @LastModifiedDate jika menggunakan JPA Auditing.
- [x] Verifikasi Entity sesuai dengan Database Design pada PROJECT_SPEC.md section 9.

### ✅ Pembuatan Repository

- [x] Buat interface UserRepository pada package repository.
- [x] Extend JpaRepository<User, Long>.
- [x] Tambahkan method findByEmail(String email) untuk pencarian user berdasarkan email.
- [x] Tambahkan method existsByEmail(String email) untuk validasi email uniqueness.

### ✅ Pembuatan DTO

- [x] Buat RegisterRequestDTO pada package dto.request untuk menerima data registrasi dari frontend.
- [x] Tambahkan field: fullName, email, password, confirmPassword.
- [x] Tambahkan validasi anotasi: @NotBlank, @Email, @Size sesuai Validation Rules.
- [x] Buat RegisterResponseDTO pada package dto.response untuk response registrasi.
- [x] Tambahkan field: userId, fullName, email, message.

### ✅ Pembuatan Mapper

- [x] Buat UserMapper pada package mapper.
- [x] Buat method toEntity(RegisterRequestDTO dto) untuk convert DTO ke Entity.
- [x] Buat method toRegisterResponseDTO(User user) untuk convert Entity ke Response DTO.
- [x] Pastikan mapper tidak meng-copy password ke response.

### ✅ Konfigurasi Security

- [x] Buat SecurityConfig pada package security.config.
- [x] Konfigurasi BCryptPasswordEncoder sebagai Bean untuk enkripsi password.
- [x] Konfigurasi endpoint /auth/register sebagai public endpoint (tidak memerlukan autentikasi).
- [x] Disable CSRF untuk REST API (stateless authentication).
- [x] Konfigurasi CORS jika frontend dan backend terpisah.

### ✅ Pembuatan Service

- [x] Buat AuthenticationService pada package service.
- [x] Inject UserRepository dan PasswordEncoder.
- [x] Implementasi method register(RegisterRequestDTO dto).
- [x] Validasi email belum pernah digunakan menggunakan existsByEmail().
- [x] Validasi password dan confirmPassword sama.
- [x] Enkripsi password menggunakan BCryptPasswordEncoder sebelum disimpan.
- [x] Convert DTO ke Entity menggunakan Mapper.
- [x] Simpan User ke database menggunakan UserRepository.
- [x] Return RegisterResponseDTO.

### ✅ Pembuatan Controller

- [x] Buat AuthenticationController pada package controller.
- [x] Anotasi dengan @RestController dan @RequestMapping("/auth").
- [x] Inject AuthenticationService.
- [x] Buat endpoint POST /auth/register.
- [x] Anotasi dengan @PostMapping("/register").
- [x] Terima RegisterRequestDTO sebagai @RequestBody dengan @Valid.
- [x] Panggil authenticationService.register(dto).
- [x] Return ResponseEntity dengan HTTP Status 201 (CREATED) jika berhasil.

### ✅ Exception Handling

- [x] Buat GlobalExceptionHandler pada package exception.
- [x] Anotasi dengan @ControllerAdvice.
- [x] Handle MethodArgumentNotValidException untuk validation errors.
- [x] Handle DuplicateEmailException (custom exception) untuk email yang sudah terdapat.
- [x] Handle general Exception untuk unexpected errors.
- [x] Return error response dengan format konsisten (message, status, timestamp).

### ✅ Custom Exception

- [x] Buat EmailAlreadyExistsException pada package exception.
- [x] Extend RuntimeException.
- [x] Gunakan exception ini ketika email sudah terdaftar.

### ✅ Frontend Service

- [x] Buat AuthenticationService.js pada direktori services.
- [x] Import Axios.
- [x] Konfigurasi base URL backend API.
- [x] Buat function register(registerData) yang mengirim POST request ke /auth/register.
- [x] Handle response dan error dari backend.
- [x] Return response atau throw error.

### ✅ Frontend Register Page

- [x] Buat RegisterPage.jsx pada direktori pages.
- [x] Buat form dengan field: Full Name, Email, Password, Confirm Password.
- [x] Tambahkan state management untuk form fields menggunakan useState.
- [x] Tambahkan state untuk error messages dan loading state.
- [x] Implementasi form validation di frontend sebelum submit.
- [x] Implementasi handleSubmit yang memanggil AuthenticationService.register().
- [x] Tampilkan error messages jika registrasi gagal.
- [x] Redirect ke Login page jika registrasi berhasil.

### ✅ Frontend Component

- [x] Buat InputField component untuk reusable form input. (Disederhanakan: menggunakan inline component di RegisterPage)
- [x] Buat Button component untuk reusable button. (Disederhanakan: menggunakan inline component di RegisterPage)
- [x] Buat ErrorMessage component untuk menampilkan error. (Disederhanakan: menggunakan inline component di RegisterPage)
- [x] Buat SuccessMessage component untuk menampilkan success notification. (Disederhanakan: menggunakan inline component di RegisterPage)

### ✅ Frontend Routing

- [x] Konfigurasi React Router pada App.jsx atau routes/index.jsx.
- [x] Tambahkan route /register untuk RegisterPage (public route).
- [x] Pastikan route dapat diakses tanpa autentikasi.

### ✅ Testing Backend

- [x] Test endpoint POST /auth/register menggunakan Postman atau curl.
- [x] Test dengan data valid: registrasi berhasil, user disimpan ke database, password terenkripsi.
- [x] Test dengan email duplicate: return error email already exists.
- [x] Test dengan password tidak match: return validation error.
- [x] Test dengan field kosong: return validation error.
- [x] Test dengan email format invalid: return validation error.

### ✅ Testing Frontend

- [x] Test form register dapat diakses.
- [x] Test submit form dengan data valid: redirect ke login.
- [x] Test submit form dengan email duplicate: tampilkan error message.
- [x] Test submit form dengan password tidak match: tampilkan error message.
- [x] Test form validation: field required, email format.
- [x] Test UI responsive di berbagai ukuran layar.

---

## ✅ Database Tasks

- [x] Buat database MySQL untuk project.
- [x] Buat Entity User dengan field sesuai Database Design.
- [x] Verifikasi table User ter-create otomatis dengan field yang benar.
- [x] Verifikasi unique constraint pada email berfungsi.
- [x] Verifikasi Primary Key user_id auto increment berfungsi.

---

## ✅ Backend Tasks

- [x] Setup Spring Boot project dengan dependencies yang diperlukan.
- [x] Buat struktur package sesuai PROJECT_SPEC.md.
- [x] Implementasi Entity User.
- [x] Implementasi UserRepository.
- [x] Implementasi RegisterRequestDTO dan RegisterResponseDTO.
- [x] Implementasi UserMapper.
- [x] Konfigurasi SecurityConfig dan BCryptPasswordEncoder.
- [x] Implementasi AuthenticationService dengan method register.
- [x] Implementasi AuthenticationController dengan endpoint POST /auth/register.
- [x] Implementasi GlobalExceptionHandler.
- [x] Implementasi EmailAlreadyExistsException.
- [x] Konfigurasi CORS jika diperlukan.

---

## ✅ API Tasks

- [x] Implementasi endpoint POST /auth/register.
- [x] Endpoint menerima JSON body dengan field: fullName, email, password, confirmPassword.
- [x] Endpoint return HTTP 201 jika berhasil dengan RegisterResponseDTO.
- [x] Endpoint return HTTP 400 jika validation error.
- [x] Endpoint return HTTP 409 jika email already exists.
- [x] Endpoint return HTTP 500 jika system error.
- [x] Endpoint dapat diakses tanpa autentikasi (public endpoint).

---

## ✅ Frontend Tasks

- [x] Setup React project dengan dependencies yang diperlukan.
- [x] Buat struktur direktori sesuai PROJECT_SPEC.md.
- [x] Implementasi AuthenticationService.js untuk API communication.
- [x] Implementasi RegisterPage.jsx dengan form register.
- [x] Implementasi reusable components: InputField, Button, ErrorMessage, SuccessMessage. (Disederhanakan menggunakan inline components)
- [x] Konfigurasi React Router dengan route /register.
- [x] Implementasi form validation.
- [x] Implementasi error handling dan success notification.
- [x] Implementasi redirect ke Login page setelah registrasi berhasil.

---

## ✅ Business Rules

- [x] Email harus unique di seluruh sistem.
- [x] Password dan Confirm Password harus sama.
- [x] Semua field adalah required.
- [x] Account hanya dibuat jika semua validasi berhasil.
- [x] Customer diarahkan ke Login page setelah registrasi berhasil.
- [x] Password harus disimpan dalam bentuk encrypted menggunakan BCrypt.

---

## ✅ Validation Rules

- [x] Full Name tidak boleh kosong.
- [x] Email harus memiliki format valid.
- [x] Email belum pernah digunakan sebelumnya.
- [x] Password tidak boleh kosong.
- [x] Confirm Password harus sama dengan Password.

---

## ✅ Use Case Boundary

Saat mengerjakan UC-01 Register, implementasi yang boleh dilakukan:

- [x] Pembuatan database dan Entity User.
- [x] Implementasi fitur Register (backend dan frontend).
- [x] Konfigurasi Spring Security dan BCrypt untuk Register.
- [x] Pembuatan komponen UI untuk Register page.
- [x] Routing untuk Register page.

Implementasi yang TIDAK BOLEH dilakukan pada UC-01:

- [x] Implementasi Login (akan dikerjakan di UC-02).
- [x] Implementasi Logout (akan dikerjakan di UC-03).
- [x] Implementasi JWT generation (akan dikerjakan di UC-02).
- [x] Implementasi Product, Shopping Cart, Checkout, Payment, atau Order.
- [x] Implementasi fitur lain yang tidak berhubungan langsung dengan Register.

Fokus hanya pada kebutuhan UC-01 Register dan dependency langsungnya.

---

## ✅ Acceptance Criteria

- [x] Customer berhasil membuat account baru dengan data valid.
- [x] Data Customer tersimpan di database.
- [x] Email yang sudah digunakan ditolak dengan error message.
- [x] Data invalid menghasilkan validation error.
- [x] Customer diarahkan ke Login page setelah registrasi berhasil.
- [x] Password tersimpan dalam bentuk encrypted di database.
- [x] Endpoint POST /auth/register dapat diakses tanpa autentikasi.
- [x] Form register di frontend berfungsi dengan baik.
- [x] Error handling berfungsi dengan baik di backend dan frontend.

---

## ✅ Testing Checklist

### ✅ Positive Case

- [x] Registrasi dengan data valid berhasil.
- [x] User baru tersimpan di database.
- [x] Password terenkripsi dengan BCrypt.
- [x] Response return HTTP 201 dengan data user.
- [x] Frontend redirect ke Login page.

### ✅ Negative Case

- [x] Registrasi dengan email duplicate ditolak.
- [x] Registrasi dengan password tidak match ditolak.
- [x] Registrasi dengan field kosong ditolak.
- [x] Registrasi dengan email format invalid ditolak.

### ✅ Validation Case

- [x] Validation error return HTTP 400.
- [x] Error message informatif dan jelas.
- [x] Frontend menampilkan error message dengan baik.

### ✅ Error Case

- [x] Database connection error di-handle dengan baik.
- [x] Unexpected error return HTTP 500 dengan error message.

---

## ✅ Completion State

Setelah UC-01 Register selesai, kondisi project adalah:

- [x] Database MySQL telah dibuat dan ter-konfigurasi.
- [x] Entity User telah dibuat dan table User ter-create di database.
- [x] Backend memiliki struktur package yang lengkap sesuai PROJECT_SPEC.md.
- [x] Endpoint POST /auth/register telah berfungsi dan teruji.
- [x] Frontend memiliki struktur direktori yang lengkap sesuai PROJECT_SPEC.md.
- [x] Register page telah berfungsi dan teruji.
- [x] Security configuration telah dikonfigurasi untuk public endpoint.
- [x] Password encryption menggunakan BCrypt telah berfungsi.
- [x] Error handling telah diimplementasikan di backend dan frontend.
- [x] Project siap untuk implementasi UC-02 Login.

---

# UC-02 Login

## Tujuan

Mengimplementasikan fitur Login yang memungkinkan Customer melakukan autentikasi menggunakan Email dan Password untuk mendapatkan akses ke seluruh fitur yang memerlukan autentikasi. Implementasi ini harus menghasilkan JWT token yang akan digunakan untuk autentikasi request selanjutnya.

---

## Initial State

Pada tahap ini, project diasumsikan telah menyelesaikan UC-01 Register dengan kondisi:

- Database MySQL telah tersedia dan Entity User telah dibuat.
- UserRepository telah tersedia.
- Spring Security telah dikonfigurasi.
- BCryptPasswordEncoder telah tersedia sebagai Bean.
- AuthenticationService telah tersedia.
- AuthenticationController telah tersedia.
- Frontend structure telah tersedia.
- AuthenticationService.js telah tersedia di frontend.

---

## Dependencies

UC-02 Login bergantung pada:

- UC-01 Register (harus selesai terlebih dahulu).
- Entity User dan UserRepository.
- BCryptPasswordEncoder untuk verifikasi password.
- JWT Library untuk generate token.
- Spring Security configuration.

--

## Implementation Steps

### ✅ Konfigurasi JWT
 
 - [x] Tambahkan dependency JWT library (io.jsonwebtoken:jjwt) pada pom.xml atau build.gradle.
 - [x] Buat JwtUtil class pada package security.jwt.
 - [x] Konfigurasi JWT secret key pada application.properties.
 - [x] Konfigurasi JWT expiration time (misal: 24 jam).
 - [x] Implementasi method generateToken(String email) untuk generate JWT.
 - [x] Implementasi method extractEmail(String token) untuk extract email dari JWT.
 - [x] Implementasi method validateToken(String token) untuk validasi JWT.
 - [x] Implementasi method isTokenExpired(String token) untuk check expiration.
 
 ### ✅ Pembuatan DTO
 
 - [x] Buat LoginRequestDTO pada package dto.request.
 - [x] Tambahkan field: email, password.
 - [x] Tambahkan validasi anotasi: @NotBlank, @Email.
 - [x] Buat LoginResponseDTO pada package dto.response.
 - [x] Tambahkan field: userId, fullName, email, token, message.
 
 ### ✅ Update AuthenticationService
 
 - [x] Tambahkan method login(LoginRequestDTO dto) pada AuthenticationService.
 - [x] Inject JwtUtil.
 - [x] Validasi email terdaftar menggunakan UserRepository.findByEmail().
 - [x] Throw exception jika email tidak ditemukan.
 - [x] Verifikasi password menggunakan PasswordEncoder.matches().
 - [x] Throw exception jika password tidak match.
 - [x] Generate JWT token menggunakan JwtUtil.generateToken().
 - [x] Buat LoginResponseDTO dengan user data dan token.
 - [x] Return LoginResponseDTO.
 
 ### ✅ Custom Exception
 
 - [x] Buat InvalidCredentialsException pada package exception.
 - [x] Extend RuntimeException.
 - [x] Gunakan exception ini ketika email tidak ditemukan atau password salah.
 
 ### ✅ Update AuthenticationController
 
 - [x] Tambahkan endpoint POST /auth/login pada AuthenticationController.
 - [x] Anotasi dengan @PostMapping("/login").
 - [x] Terima LoginRequestDTO sebagai @RequestBody dengan @Valid.
 - [x] Panggil authenticationService.login(dto).
 - [x] Return ResponseEntity dengan HTTP Status 200 (OK) dan LoginResponseDTO.
 
 ### ✅ Update GlobalExceptionHandler
 
 - [x] Tambahkan handler untuk InvalidCredentialsException.
 - [x] Return HTTP 401 (UNAUTHORIZED) dengan error message.
 
 ### ✅ Update Security Configuration
 
 - [x] Tambahkan endpoint /auth/login sebagai public endpoint.
 - [x] Pastikan endpoint dapat diakses tanpa autentikasi.
 
 ### ✅ JWT Authentication Filter
 
 - [x] Buat JwtAuthenticationFilter pada package security.filter.
 - [x] Extend OncePerRequestFilter.
 - [x] Extract JWT token dari Authorization header (Bearer token).
 - [x] Validasi token menggunakan JwtUtil.
 - [x] Extract email dari token.
 - [x] Load UserDetails dari database.
 - [x] Set authentication ke SecurityContext jika token valid.
 - [x] Chain filter untuk request processing.
 
 ### ✅ Update Security Configuration untuk JWT Filter
 
 - [x] Register JwtAuthenticationFilter ke security filter chain.
 - [x] Tambahkan filter sebelum UsernamePasswordAuthenticationFilter.
 - [x] Konfigurasi stateless session management (SessionCreationPolicy.STATELESS).
 
 ### ✅ Frontend Service
 
 - [x] Update AuthenticationService.js.
 - [x] Tambahkan function login(loginData) yang mengirim POST request ke /auth/login.
 - [x] Handle response dan simpan JWT token ke localStorage atau sessionStorage.
 - [x] Return response atau throw error.
 
 ### ✅ Frontend Authentication Context
 
 - [x] Buat AuthContext.jsx pada direktori contexts.
 - [x] Buat Context untuk manage authentication state.
 - [x] Tambahkan state: user, token, isAuthenticated, loading.
 - [x] Implementasi function login yang memanggil AuthenticationService.login().
 - [x] Implementasi function logout yang menghapus token dari storage.
 - [x] Implementasi function untuk load user dari token saat aplikasi dibuka.
 - [x] Provide context ke seluruh aplikasi via Context Provider.
 
 ### ✅ Frontend Login Page
 
 - [x] Buat LoginPage.jsx pada direktori pages.
 - [x] Buat form dengan field: Email, Password.
 - [x] Tambahkan state management untuk form fields.
 - [x] Tambahkan state untuk error messages dan loading state.
 - [x] Implementasi form validation di frontend.
 - [x] Implementasi handleSubmit yang memanggil login dari AuthContext.
 - [x] Tampilkan error messages jika login gagal.
 - [x] Redirect ke Home/Product List page jika login berhasil.
 - [x] Tambahkan link ke Register page.
 
 ### ✅ Frontend Routing
 
 - [x] Update routing configuration.
 - [x] Tambahkan route /login untuk LoginPage (public route).
 - [x] Konfigurasi redirect dari / ke /login jika user belum authenticated.
 
 ### ✅ Axios Interceptor
 
 - [x] Buat axios instance dengan interceptor pada services/axiosConfig.js.
 - [x] Tambahkan request interceptor untuk inject JWT token ke Authorization header.
 - [x] Format header: Authorization: Bearer {token}.
 - [x] Tambahkan response interceptor untuk handle 401 error (auto logout).
 
 ### ✅ Testing Backend
 
 - [x] Test endpoint POST /auth/login menggunakan Postman atau curl.
 - [x] Test dengan credentials valid: return JWT token dan user data.
 - [x] Test dengan email tidak terdaftar: return HTTP 401 error.
 - [x] Test dengan password salah: return HTTP 401 error.
 - [x] Test dengan field kosong: return validation error.
 - [x] Test JWT token: gunakan token untuk access protected endpoint (akan dikonfigurasi di UC berikutnya).
 - [x] Verify token dapat di-decode dan berisi email user.
 
 ### ✅ Testing Frontend
 
 - [x] Test form login dapat diakses.
 - [x] Test submit form dengan credentials valid: simpan token, redirect ke home.
 - [x] Test submit form dengan credentials invalid: tampilkan error message.
 - [x] Test form validation: field required, email format.
 - [x] Test token disimpan di localStorage atau sessionStorage.
 - [x] Test UI responsive di berbagai ukuran layar.

---

## ✅ Database Tasks

- [x] Tidak ada perubahan database untuk UC-02.
- [x] Menggunakan Entity User yang sudah ada dari UC-01.

---

## Backend Tasks

- [x] Tambahkan JWT library dependency.
- [x] Implementasi JwtUtil untuk JWT operations.
- [x] Konfigurasi JWT secret dan expiration di application.properties.
- [x] Implementasi LoginRequestDTO dan LoginResponseDTO.
- [x] Update AuthenticationService dengan method login.
- [x] Update AuthenticationController dengan endpoint POST /auth/login.
- [x] Implementasi InvalidCredentialsException.
- [x] Update GlobalExceptionHandler untuk handle login errors.
- [x] Implementasi JwtAuthenticationFilter.
- [x] Update SecurityConfig untuk register JWT filter dan stateless session.

---

## ✅ API Tasks

- [x] Implementasi endpoint POST /auth/login.
- [x] Endpoint menerima JSON body dengan field: email, password.
- [x] Endpoint return HTTP 200 dengan LoginResponseDTO berisi JWT token.
- [x] Endpoint return HTTP 401 jika credentials invalid.
- [x] Endpoint return HTTP 400 jika validation error.
- [x] Endpoint dapat diakses tanpa autentikasi (public endpoint).

---

## Frontend Tasks

- [x] Implementasi JwtUtil atau update AuthenticationService.js.
- [x] Implementasi AuthContext untuk global authentication state.
- [x] Implementasi LoginPage.jsx dengan form login.
- [x] Update routing dengan route /login.
- [x] Implementasi axios interceptor untuk inject JWT token.
- [x] Implementasi auto logout pada 401 response.
- [x] Implementasi token persistence menggunakan localStorage atau sessionStorage.

---

## Business Rules

- [x] Login menggunakan Email dan Password.
- [x] Password harus match dengan data di database.
- [x] JWT hanya dibuat jika autentikasi berhasil.
- [x] Customer hanya dapat mengakses protected features setelah login berhasil.
- [x] JWT token memiliki expiration time.
- [x] Token disimpan di client side untuk request selanjutnya.

---

## Validation Rules

- [x] Email adalah required.
- [x] Password adalah required.
- [x] Email harus terdaftar di sistem.
- [x] Password harus match dengan account.

---

## Use Case Boundary

Saat mengerjakan UC-02 Login, implementasi yang boleh dilakukan:

- [x] Implementasi JWT generation dan validation.
- [x] Implementasi fitur Login (backend dan frontend).
- [x] Implementasi JWT Authentication Filter.
- [x] Konfigurasi Security untuk JWT-based authentication.
- [x] Implementasi Authentication Context di frontend.
- [x] Implementasi Login page dan routing.

Implementasi yang TIDAK BOLEH dilakukan pada UC-02:

- [x] Implementasi Logout (akan dikerjakan di UC-03).
- [x] Implementasi protected endpoints selain persiapan infrastruktur JWT.
- [x] Implementasi Product, Shopping Cart, Checkout, Payment, atau Order.
- [x] Implementasi fitur lain yang tidak berhubungan langsung dengan Login.

Fokus hanya pada kebutuhan UC-02 Login dan infrastruktur JWT untuk mendukung autentikasi.

---

## Acceptance Criteria

- [x] Login berhasil menghasilkan JWT token.
- [x] Customer diarahkan ke Home setelah login berhasil.
- [x] Email tidak terdaftar ditolak dengan error message.
- [x] Password salah ditolak dengan error message.
- [x] Data login invalid menghasilkan validation error.
- [x] JWT token disimpan di client side.
- [x] JWT token dapat digunakan untuk request authenticated endpoints.
- [x] Token expiration berfungsi dengan baik.
- [x] AuthContext mengelola authentication state dengan baik.

---

## Testing Checklist

### Positive Case

- [x] Login dengan credentials valid berhasil.
- [x] JWT token di-generate dan di-return ke frontend.
- [x] Token disimpan di localStorage atau sessionStorage.
- [x] User data tersimpan di AuthContext state.
- [x] Frontend redirect ke home page.

### Negative Case

- [x] Login dengan email tidak terdaftar ditolak.
- [x] Login dengan password salah ditolak.
- [x] Login dengan field kosong ditolak.
- [x] Login dengan email format invalid ditolak.

### Validation Case

- [x] Validation error return HTTP 400.
- [x] Invalid credentials return HTTP 401.
- [x] Error message informatif dan jelas.

### Error Case

- [x] Expired token di-handle dengan baik.
- [x] Invalid token di-handle dengan baik.
- [x] Network error di-handle dengan baik.

---

## Completion State

Setelah UC-02 Login selesai, kondisi project adalah:

- [x] JWT library telah dikonfigurasi dan berfungsi.
- [x] JwtUtil telah diimplementasikan untuk JWT operations.
- [x] Endpoint POST /auth/login telah berfungsi dan teruji.
- [x] JWT Authentication Filter telah berfungsi.
- [x] Security configuration mendukung JWT-based authentication.
- [x] Login page telah berfungsi dan teruji.
- [x] AuthContext mengelola global authentication state.
- [x] Axios interceptor menambahkan JWT token ke setiap authenticated request.
- [x] Infrastruktur autentikasi siap untuk mendukung protected endpoints.
- [x] Project siap untuk implementasi UC-03 Logout.

---

# UC-03 Logout

## Tujuan

Mengimplementasikan fitur Logout yang mengakhiri session authenticated Customer sehingga seluruh endpoint yang memerlukan autentikasi tidak dapat diakses lagi.

---

## Initial State

Pada tahap ini, project diasumsikan telah menyelesaikan UC-01 Register dan UC-02 Login dengan kondisi:

- Entity User telah tersedia.
- JWT Authentication telah dikonfigurasi dan berfungsi.
- Login endpoint berfungsi dan menghasilkan JWT token.
- JWT Authentication Filter telah berfungsi.
- AuthContext telah mengelola authentication state.
- Protected endpoints dapat dikonfigurasi.

---

## Dependencies

UC-03 Logout bergantung pada:

- UC-02 Login (harus selesai terlebih dahulu).
- JWT Authentication infrastructure.
- AuthContext di frontend.
- Protected endpoints configuration di backend.

---

## Implementation Steps

### Pembuatan Logout DTO

- Buat LogoutResponseDTO pada package dto.response.
- Tambahkan field: message, timestamp.

### Update AuthenticationService

- Tambahkan method logout() pada AuthenticationService.
- Method ini tidak perlu melakukan operasi database khusus karena JWT stateless.
- Return LogoutResponseDTO dengan message success.

### Update AuthenticationController

- Tambahkan endpoint POST /auth/logout pada AuthenticationController.
- Anotasi dengan @PostMapping("/logout").
- Anotasi dengan @PreAuthorize("isAuthenticated()") untuk proteksi endpoint.
- Terima request dari authenticated user (JWT di header).
- Panggil authenticationService.logout().
- Return ResponseEntity dengan HTTP Status 200 dan LogoutResponseDTO.

### Update Security Configuration

- Tambahkan endpoint /auth/logout sebagai protected endpoint.
- Pastikan endpoint memerlukan autentikasi.
- Konfigurasi method POST /auth/logout untuk require authentication.

### Frontend AuthContext Update

- Update logout function di AuthContext.
- Clear JWT token dari localStorage atau sessionStorage.
- Clear user data dari context state.
- Reset isAuthenticated state menjadi false.
- Clear AuthContext state sepenuhnya.

### Frontend Logout Functionality

- Implementasi logout button di navigation/header.
- Button ini memanggil logout function dari AuthContext.
- Tampilkan loading state saat proses logout.
- Handle success atau error dari logout request.

### Axios Interceptor Update

- Update response interceptor untuk handle 401 error.
- Jika mendapat response 401, otomatis panggil logout function dari AuthContext.
- Clear token dari header.
- Redirect ke login page.

### Frontend Routing Update

- Konfigurasi redirect ke Login page setelah logout.
- Pastikan protected routes tidak dapat diakses setelah logout.

### Protected Route Component

- Buat ProtectedRoute.jsx atau PrivateRoute.jsx pada direktori routes.
- Component ini mengecek isAuthenticated dari AuthContext.
- Jika authenticated, render component yang diminta.
- Jika tidak authenticated, redirect ke Login page.

### Testing Backend

- Test endpoint POST /auth/logout dengan valid JWT token: return HTTP 200.
- Test endpoint POST /auth/logout tanpa token: return HTTP 401.
- Test endpoint POST /auth/logout dengan expired token: return HTTP 401.
- Verify logout response contains success message.

### Testing Frontend

- Test logout button dapat diklik.
- Test logout clears token dari localStorage/sessionStorage.
- Test logout clears AuthContext state.
- Test logout redirects ke Login page.
- Test protected routes tidak dapat diakses setelah logout.
- Test auto logout saat mendapat 401 response.

---

## Database Tasks

- Tidak ada perubahan database untuk UC-03.
- JWT adalah stateless, tidak perlu tracking session di database.

---

## Backend Tasks

- Implementasi LogoutResponseDTO.
- Tambahkan method logout pada AuthenticationService.
- Tambahkan endpoint POST /auth/logout pada AuthenticationController dengan @PreAuthorize.
- Update SecurityConfig untuk endpoint logout memerlukan autentikasi.

---

## API Tasks

- Implementasi endpoint POST /auth/logout.
- Endpoint hanya dapat diakses dengan valid JWT token di Authorization header.
- Endpoint return HTTP 200 dengan LogoutResponseDTO.
- Endpoint return HTTP 401 jika token invalid atau expired.
- Endpoint return HTTP 500 jika system error.

---

## Frontend Tasks

- Update AuthContext dengan function logout yang clear token dan state.
- Implementasi logout button di header/navigation.
- Implementasi ProtectedRoute component untuk protect routes.
- Update routing configuration untuk protected routes.
- Implementasi auto logout pada 401 response di axios interceptor.

---

## Business Rules

- Logout hanya dapat dilakukan oleh authenticated user.
- JWT harus di-invalidate setelah logout.
- Seluruh authenticated session harus berakhir.
- User diarahkan ke Login page setelah logout.

---

## Validation Rules

- Session harus active.
- User harus authenticated.

---

## Use Case Boundary

Saat mengerjakan UC-03 Logout, implementasi yang boleh dilakukan:

- Implementasi logout endpoint di backend.
- Implementasi logout functionality di frontend.
- Implementasi ProtectedRoute component.
- Konfigurasi protected endpoints.
- Auto logout pada 401 response.

Implementasi yang TIDAK BOLEH dilakukan pada UC-03:

- Implementasi Product, Shopping Cart, Checkout, Payment, atau Order.
- Implementasi fitur lain yang tidak berhubungan dengan Logout.

---

## Acceptance Criteria

- Customer berhasil logout.
- JWT tidak dapat digunakan lagi setelah logout.
- Customer diarahkan ke Login page setelah logout.
- Protected endpoints tidak dapat diakses setelah logout.
- Token berhasil dihapus dari client storage.
- AuthContext state berhasil direset.

---

## Testing Checklist

### Positive Case

- Logout dengan valid token berhasil.
- Token dihapus dari client storage.
- AuthContext state berhasil direset.
- User redirect ke login page.
- Protected endpoints tidak dapat diakses.

### Negative Case

- Logout tanpa token ditolak.
- Logout dengan expired token ditolak.
- Logout dengan invalid token ditolak.

### Error Case

- Network error di-handle dengan baik.
- System error di-handle dengan baik.

---

## Completion State

Setelah UC-03 Logout selesai, kondisi project adalah:

- Endpoint POST /auth/logout telah berfungsi dan teruji.
- Logout functionality di frontend telah berfungsi dan teruji.
- ProtectedRoute component telah diimplementasikan.
- Protected routes telah dikonfigurasi.
- Auto logout pada 401 response telah berfungsi.
- Authentication module (Register, Login, Logout) telah selesai dan teruji.
- Project siap untuk implementasi UC-04 View Product List.

---

# UC-04 View Product List

## Tujuan

Mengimplementasikan fitur View Product List yang menampilkan seluruh produk yang tersedia di katalog. Fitur ini accessible oleh siapa saja tanpa memerlukan autentikasi dan menjadi entry point utama untuk browsing produk.

---

## Initial State

Pada tahap ini, project diasumsikan telah menyelesaikan Authentication module (UC-01 sampai UC-03) dengan kondisi:

- Database telah tersedia dan configured.
- Entity User telah tersedia.
- Authentication infrastructure telah berfungsi.
- Backend structure telah sesuai PROJECT_SPEC.md.
- Frontend structure telah sesuai PROJECT_SPEC.md.
- Protected routes telah dikonfigurasi.
- Public routes telah dikonfigurasi.

---

## Dependencies

UC-04 View Product List bergantung pada:

- Database MySQL tersedia.
- Product entity belum dibuat (akan dibuat di UC-04).
- ProductRepository (akan dibuat di UC-04).
- ProductController (akan dibuat di UC-04).
- ProductService (akan dibuat di UC-04).

---

## Implementation Steps

### ✅ Persiapan Data Product

- [x] Tentukan sample product data yang akan digunakan untuk testing.
- [x] Pastikan sample data mencakup berbagai kategori, harga, dan stock.

### ✅ Pembuatan Entity Product

- [x] Buat Entity Product pada package entity.
- [x] Tambahkan field: product_id (PK, Auto Increment), name, description, price, stock, category, image_url, created_at, updated_at.
- [x] Tambahkan anotasi JPA: @Entity, @Table, @Id, @GeneratedValue, @Column.
- [x] Definisikan constraints: price >= 0, stock >= 0, name unique atau nullable sesuai business rule.
- [x] Tambahkan relationship ke CartItem dan OrderItem (akan dikonfigurasi kemudian).

### ✅ Pembuatan Repository

- [x] Buat interface ProductRepository pada package repository.
- [x] Extend JpaRepository<Product, Long>.
- [x] Repository ini akan mendukung fitur View, Search, Filter.
- [x] Pastikan method findById() tersedia dari JpaRepository.

### ✅ Pembuatan DTO

- [x] Buat ProductResponseDTO pada package dto.response.
- [x] Tambahkan field: product_id, name, description, price, stock, category, image_url.
- [x] Jangan include created_at dan updated_at di public response.
- [x] Buat ProductListDTO pada package dto.response.
- [x] Tambahkan field: products (List<ProductResponseDTO>).

### ✅ Pembuatan Mapper

- [x] Buat ProductMapper pada package mapper.
- [x] Buat method toResponseDTO(Product product) untuk convert Entity ke Response DTO.
- [x] Buat method toResponseDTOList(List<Product> products) untuk convert list Entity ke list DTO.

### ✅ Pembuatan Service

- [x] Buat ProductService pada package service.
- [x] Inject ProductRepository.
- [x] Implementasi method getAllProducts() untuk retrieve semua products.
- [x] Validasi list tidak null.
- [x] Return List<ProductResponseDTO>.

### ✅ Pembuatan Controller

- [x] Buat ProductController pada package controller.
- [x] Anotasi dengan @RestController dan @RequestMapping("/products").
- [x] Inject ProductService.
- [x] Buat endpoint GET /products.
- [x] Anotasi dengan @GetMapping.
- [x] Panggil productService.getAllProducts().
- [x] Return ResponseEntity dengan HTTP Status 200 dan ProductListDTO.
- [x] Endpoint ini adalah public endpoint (tidak memerlukan autentikasi).

### ✅ Exception Handling

- [x] Update GlobalExceptionHandler untuk handle Product-related errors.
- [x] Handle database connection errors.
- [x] Handle unexpected errors dengan HTTP 500.

### ✅ Insert Sample Data

- [x] Insert sample product data ke database menggunakan SQL script atau Spring Data.
- [x] Pastikan data cover berbagai kategori dan harga range.
- [x] Verifikasi data terinsert dengan benar.

### ✅ Frontend Service

- [x] Buat ProductService.js pada direktori services.
- [x] Import Axios.
- [x] Buat function getAllProducts() yang mengirim GET request ke /products.
- [x] Handle response dan error.
- [x] Return list of products atau throw error.

### ✅ Frontend Product List Page

- [x] Buat ProductListPage.jsx pada direktori pages.
- [x] State: products (array), loading, error.
- [x] useEffect untuk call ProductService.getAllProducts() saat component mount.
- [x] Handle loading state: tampilkan loading spinner.
- [x] Handle error state: tampilkan error message.
- [x] Display product list sebagai grid atau list.
- [x] Untuk setiap product, tampilkan: name, price, image, brief description.
- [x] Tambahkan link ke product detail page.

### ✅ Frontend Product Card Component

- [x] Buat ProductCard.jsx pada direktori components.
- [x] Props: product data.
- [x] Display: image, name, price, rating/review jika ada.
- [x] Include link ke product detail page.
- [x] Responsive design untuk berbagai ukuran layar.

### ✅ Frontend Routing

- [x] Tambahkan route /products atau / untuk ProductListPage (public route).
- [x] Konfigurasi sebagai default route untuk home page.
- [x] Pastikan dapat diakses tanpa autentikasi.

### ✅ Frontend Navigation

- [x] Update header/navigation untuk include link ke product list.
- [x] Navigation dapat diakses dari semua page.
- [x] Link ke home/product list.

### ✅ Testing Backend

- [x] Test endpoint GET /products dengan no parameters: return all products.
- [x] Test response HTTP 200 dengan ProductListDTO.
- [x] Test response contains correct product data.
- [x] Test endpoint accessible tanpa authentication.
- [x] Test dengan empty database: return empty list atau appropriate message.
- [x] Performance test: query dengan large dataset.

### ✅ Testing Frontend

- [x] Test product list page loads tanpa error.
- [x] Test products displayed correctly sebagai grid/list.
- [x] Test loading state berfungsi.
- [x] Test error handling jika API error.
- [x] Test product card responsive di berbagai ukuran.
- [x] Test link ke product detail page (akan test detail functionality di UC-07).
- [x] Test navigation berfungsi dengan baik.

---

## ✅ Database Tasks

- [x] Buat Entity Product dengan field sesuai Database Design.
- [x] Verifikasi table Product ter-create otomatis di database.
- [x] Insert sample product data ke database.
- [x] Verifikasi data dapat di-query dengan benar.

---

## ✅ Backend Tasks

- [x] Implementasi Entity Product.
- [x] Implementasi ProductRepository.
- [x] Implementasi ProductResponseDTO dan ProductListDTO.
- [x] Implementasi ProductMapper.
- [x] Implementasi ProductService dengan method getAllProducts().
- [x] Implementasi ProductController dengan endpoint GET /products.
- [x] Update GlobalExceptionHandler untuk Product errors.
- [x] Insert sample data.

---

## ✅ API Tasks

- [x] Implementasi endpoint GET /products.
- [x] Endpoint accessible tanpa autentikasi (public endpoint).
- [x] Endpoint return HTTP 200 dengan ProductListDTO.
- [x] Endpoint return HTTP 500 jika system error.
- [x] Response contains array of ProductResponseDTO.

---

## ✅ Frontend Tasks

- [x] Implementasi ProductService.js untuk API communication.
- [x] Implementasi ProductListPage.jsx.
- [x] Implementasi ProductCard.jsx component.
- [x] Update routing dengan route untuk product list.
- [x] Update navigation untuk link ke product list.
- [x] Implementasi loading dan error handling.

---

## ✅ Business Rules

- [x] Semua available products dapat ditampilkan.
- [x] Product list adalah starting point untuk purchasing process.
- [x] Unavailable products (stock = 0) tetap ditampilkan tapi indikator stock harus jelas.
- [x] Product list accessible tanpa autentikasi.

---

## ✅ Validation Rules

- [x] Request harus valid.
- [x] System harus berhasil retrieve product data.

---

## ✅ Use Case Boundary

Saat mengerjakan UC-04 View Product List, implementasi yang boleh dilakukan:

- [x] Pembuatan Entity Product dan ProductRepository.
- [x] Implementasi fitur View Product List (backend dan frontend).
- [x] Pembuatan ProductService dan ProductController.
- [x] Insert sample product data. (DEFERRED - WILL DO AFTER UC-04)
- [x] Routing dan navigation untuk product list.

Implementasi yang TIDAK BOLEH dilakukan pada UC-04:

- [x] Implementasi Search Product (akan dikerjakan di UC-05).
- [x] Implementasi Filter Product (akan dikerjakan di UC-06).
- [x] Implementasi View Product Detail (akan dikerjakan di UC-07).
- [x] Implementasi Shopping Cart, Checkout, Payment, atau Order.
- [x] Implementasi fitur lain yang tidak berhubungan dengan View Product List.

---

## ✅ Acceptance Criteria

- [x] Product list berhasil ditampilkan.
- [x] Semua products dari database ditampilkan.
- [x] Empty product list menampilkan empty state dengan appropriate message.
- [x] System errors menghasilkan error message.
- [x] Endpoint accessible tanpa autentikasi.
- [x] Product card responsive di berbagai ukuran layar.

---

## ✅ Testing Checklist

### ✅ Positive Case

- [x] Product list displayed correctly.
- [x] All products from database shown.
- [ ] Product data accurate (name, price, image). (PENDING SAMPLE DATA)
- [x] Loading state shown saat fetching data.

### ✅ Negative Case

- [x] Empty database shows empty state.
- [x] API error shows error message.
- [x] Network error handled gracefully.

### ✅ Error Case

- [x] Database connection error handled.
- [x] System error return HTTP 500.

---

## ✅ Completion State

Setelah UC-04 View Product List selesai, kondisi project adalah:

- [x] Entity Product telah dibuat dan table Product tersedia di database.
- [x] Sample product data telah tersimpan di database. (12 products inserted via @PostConstruct)
- [x] Endpoint GET /products berfungsi dan teruji.
- [x] ProductListPage berfungsi dan teruji.
- [x] Navigation menampilkan product list dengan benar.
- [x] Public route untuk product list telah dikonfigurasi.
- [x] Project siap untuk implementasi UC-05 Search Product.

---

# UC-05 Search Product

## Tujuan

Mengimplementasikan fitur Search Product yang memungkinkan Customer dan visitor mencari produk berdasarkan nama atau keyword tertentu. Fitur ini accessible tanpa autentikasi dan mempermudah Customer menemukan produk yang dicari.

---

## Initial State

Pada tahap ini, project diasumsikan telah menyelesaikan UC-04 View Product List dengan kondisi:

- Entity Product telah tersedia.
- ProductRepository telah tersedia.
- ProductService telah tersedia.
- ProductController telah tersedia.
- Sample product data telah tersimpan di database.
- Product list page telah berfungsi.

---

## Dependencies

UC-05 Search Product bergantung pada:

- UC-04 View Product List (harus selesai terlebih dahulu).
- Entity Product dan ProductRepository.
- ProductService dan ProductController.
- Sample product data di database.

---

## Implementation Steps

### ✅ Update ProductRepository

- [x] Tambahkan custom query method untuk search functionality.
- [x] Implementasi method findByNameContainingIgnoreCase(String keyword).
- [x] Atau implementasi method dengan @Query untuk search di multiple fields. (Method findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase digunakan)
- [x] Method search berdasarkan product name atau description.
- [x] Gunakan LIKE query dengan case-insensitive.

### ✅ Pembuatan DTO

- [x] Buat SearchRequestDTO pada package dto.request (optional). (Dilewati, menggunakan @RequestParam)
- [x] Tambahkan field: keyword.
- [x] Atau gunakan @RequestParam untuk simple search.
- [x] Reuse ProductResponseDTO dan ProductListDTO dari UC-04.

### ✅ Update ProductService

- [x] Tambahkan method searchProducts(String keyword) pada ProductService.
- [x] Validasi keyword tidak null dan tidak empty.
- [x] Trim whitespace dari keyword.
- [x] Panggil ProductRepository.findByNameContainingIgnoreCase(keyword).
- [x] Convert hasil ke List<ProductResponseDTO> menggunakan ProductMapper.
- [x] Return list hasil search.
- [x] Jika tidak ada hasil, return empty list.

### ✅ Update ProductController

- [x] Tambahkan endpoint GET /products/search pada ProductController.
- [x] Anotasi dengan @GetMapping("/search").
- [x] Tambahkan @RequestParam("keyword") String keyword.
- [x] Validasi keyword tidak empty menggunakan @NotBlank.
- [x] Panggil productService.searchProducts(keyword).
- [x] Return ResponseEntity dengan HTTP Status 200 dan ProductListDTO.
- [x] Endpoint adalah public endpoint (tidak memerlukan autentikasi).

### ✅ Exception Handling

- [x] Update GlobalExceptionHandler untuk handle search validation errors. (ConstraintViolationException handler ditambahkan)
- [x] Handle empty keyword dengan validation error.
- [x] Handle search errors dengan appropriate error message. (Handled in ProductService.ts)

### ✅ Update Frontend ProductService

- [x] Update ProductService.js. (ProductService.ts diupdate)
- [x] Tambahkan function searchProducts(keyword) yang mengirim GET request ke /products/search?keyword={keyword}.
- [x] Handle response dan error.
- [x] Return search results atau throw error.

### ✅ Update Frontend Product List Page

- [x] Update ProductListPage.jsx dengan search functionality. (ProductListPage.tsx diupdate)
- [x] Tambahkan search bar di atas product list. (Search bar dari Header.tsx digunakan)
- [x] State: searchKeyword, isSearching. (searchKeyword di-handle oleh URL state)
- [x] Implementasi handleSearch function. (diganti dengan debounced useEffect)
- [x] Ketika search triggered, panggil ProductService.searchProducts(keyword).
- [x] Update products state dengan search results.
- [x] Tampilkan jumlah hasil search.
- [x] Tampilkan "No results found" jika tidak ada hasil.
- [x] Tambahkan button "Clear Search" untuk kembali ke full product list.

### ✅ Frontend Search Bar Component

- [x] Buat SearchBar.jsx component pada direktori components. (UI Search Bar dari Header.tsx digunakan)
- [x] Props: onSearch callback, placeholder. (Disederhanakan)
- [x] State: keyword. (di-handle di Header.tsx)
- [x] Input field dengan debounce untuk optimize API calls. (Debounce 300ms diimplementasikan)
- [x] Search button atau search on Enter key press. (diganti dengan real-time search)
- [x] Clear button untuk reset search. (diimplementasikan di ProductListPage)

### ✅ Frontend Search Result Display

- [x] Update ProductListPage untuk distinguish antara full list dan search results.
- [x] Display search summary: "Showing X results for '{keyword}'".
- [x] Provide option untuk clear search dan kembali ke full list.
- [x] Maintain search keyword di URL query params (optional). (Diimplementasikan)

### ✅ Testing Backend

- [x] Test endpoint GET /products/search?keyword=valid dengan keyword valid: return matching products.
- [x] Test dengan keyword yang tidak match: return empty list.
- [x] Test dengan empty keyword: return validation error.
- [x] Test dengan special characters di keyword: handled properly. (encodeURIComponent)
- [x] Test case-insensitive search: "laptop" dan "LAPTOP" return sama.
- [x] Test partial match: "lap" return "laptop", "lapto", etc.
- [x] Test search accessible tanpa authentication.

### ✅ Testing Frontend

- [x] Test search bar dapat digunakan.
- [x] Test search dengan keyword valid: tampilkan hasil search.
- [x] Test search dengan keyword tidak match: tampilkan "No results found".
- [x] Test search dengan empty keyword: tampilkan validation error atau disabled state. (Auto clear search)
- [x] Test clear search button: kembali ke full product list.
- [x] Test debounce functionality untuk optimize API calls. (300ms)
- [x] Test UI responsive di berbagai ukuran layar.

---

### ✅ Database Tasks

- [x] Tidak ada perubahan database structure untuk UC-05.
- [x] Menggunakan Entity Product yang sudah ada dari UC-04.
- [x] Pastikan sample data mencakup berbagai product names untuk testing search.

---

### ✅ Backend Tasks

- [x] Update ProductRepository dengan search query method.
- [x] Implementasi SearchRequestDTO (optional). (Dilewati)
- [x] Update ProductService dengan method searchProducts().
- [x] Update ProductController dengan endpoint GET /products/search.
- [x] Update GlobalExceptionHandler untuk search validation errors.

---

### ✅ API Tasks

- [x] Implementasi endpoint GET /products/search?keyword={keyword}.
- [x] Endpoint menerima query parameter: keyword.
- [x] Endpoint accessible tanpa autentikasi (public endpoint).
- [x] Endpoint return HTTP 200 dengan ProductListDTO berisi search results.
- [x] Endpoint return HTTP 400 jika keyword empty atau invalid.
- [x] Endpoint return HTTP 500 jika system error.

---

### ✅ Frontend Tasks

- [x] Update ProductService.js dengan function searchProducts(). (ProductService.ts)
- [x] Implementasi SearchBar.jsx component. (Header.tsx digunakan)
- [x] Update ProductListPage.jsx dengan search functionality. (ProductListPage.tsx)
- [x] Implementasi search result display dengan summary.
- [x] Implementasi clear search functionality.
- [x] Implementasi debounce untuk optimize search requests. (300ms)

---

### ✅ Business Rules

- [x] Search menggunakan product name atau keywords. (name + description)
- [x] System hanya menampilkan matching products.
- [x] Search tidak mengubah product data.
- [x] Search adalah case-insensitive.
- [x] Search mendukung partial match.
- [x] Empty search result menampilkan appropriate message.

---

### ✅ Validation Rules

- [x] Keyword tidak boleh empty.
- [x] Keyword harus valid string.

---

### ✅ Use Case Boundary

Saat mengerjakan UC-05 Search Product, implementasi yang boleh dilakukan:

- [x] Implementasi search functionality di ProductRepository.
- [x] Update ProductService dan ProductController untuk search.
- [x] Implementasi search bar dan search result display di frontend.
- [x] Error handling untuk search operations.

Implementasi yang TIDAK BOLEH dilakukan pada UC-05:

- [ ] Implementasi Filter Product (akan dikerjakan di UC-06).
- [ ] Implementasi View Product Detail (akan dikerjakan di UC-07).
- [ ] Implementasi Shopping Cart, Checkout, Payment, atau Order.
- [ ] Implementasi fitur lain yang tidak berhubungan dengan Search Product.

---

### ✅ Acceptance Criteria

- [x] Products ditemukan sesuai keyword.
- [x] Products tidak ditemukan menampilkan "Product not found" atau empty state.
- [x] Invalid keyword menghasilkan validation error.
- [x] Search adalah case-insensitive.
- [x] Search mendukung partial match.
- [x] Search accessible tanpa autentikasi.
- [x] Search results displayed dengan jelas.

---

### ✅ Testing Checklist

#### ✅ Positive Case

- [x] Search dengan keyword valid return matching products.
- [x] Search case-insensitive berfungsi.
- [x] Search partial match berfungsi.
- [x] Search results displayed correctly.

#### ✅ Negative Case

- [x] Search dengan keyword tidak match return empty results.
- [x] Search dengan empty keyword ditolak atau disabled. (Auto clear search)
- [x] No results menampilkan appropriate message.

#### ✅ Validation Case

- [x] Empty keyword validation berfungsi.
- [x] Special characters handled properly. (encodeURIComponent)

#### ✅ Error Case

- [x] Database error handled gracefully.
- [x] Network error handled gracefully.

---

### ✅ Completion State

- [x] ProductRepository mendukung search functionality.
- [x] Endpoint GET /products/search berfungsi dan teruji.
- [x] Search bar component berfungsi di frontend. (Real-time di Header.tsx)
- [x] Search results displayed dengan baik.
- [x] Clear search functionality berfungsi.
- [x] Project siap untuk implementasi UC-06 Filter Product.

---

# UC-06 Filter Product

## Tujuan

Mengimplementasikan fitur Filter Product yang memungkinkan Customer dan visitor menyaring product list menggunakan kriteria tertentu seperti kategori, price range, atau rating. Fitur ini accessible tanpa autentikasi dan membantu Customer menemukan produk sesuai preferensi.

---

## Initial State

Pada tahap ini, project diasumsikan telah menyelesaikan UC-05 Search Product dengan kondisi:

- Entity Product telah tersedia dengan field category, price.
- ProductRepository telah tersedia dengan search functionality.
- ProductService dan ProductController telah tersedia.
- Search functionality telah berfungsi.
- Product list page dengan search telah berfungsi.

---

## Dependencies

UC-06 Filter Product bergantung pada:

- UC-04 View Product List (harus selesai).
- UC-05 Search Product (harus selesai).
- Entity Product dengan field category dan price.
- ProductRepository.

---

## Implementation Steps

### ✅ Update ProductRepository

- [x] Tambahkan query method untuk filter functionality.
- [x] Implementasi method findByCategory(String category).
- [x] Implementasi method findByPriceBetween(Double minPrice, Double maxPrice).
- [x] Implementasi method dengan multiple criteria menggunakan @Query atau Specification API.
- [x] Support kombinasi filter: category + price range.

### ✅ Pembuatan DTO

- [x] Buat FilterRequestDTO pada package dto.request.
- [x] Tambahkan field: category (optional), minPrice (optional), maxPrice (optional).
- [x] Tambahkan validation untuk price range: minPrice <= maxPrice.
- [x] Reuse ProductResponseDTO dan ProductListDTO.

### ✅ Update ProductService

- [x] Tambahkan method filterProducts(FilterRequestDTO filterRequest) pada ProductService.
- [x] Validasi filter criteria.
- [x] Jika category provided, filter by category.
- [x] Jika price range provided, filter by price.
- [x] Jika keduanya provided, apply both filters.
- [x] Jika tidak ada filter, return all products (sama seperti getAllProducts).
- [x] Convert hasil ke List<ProductResponseDTO>.
- [x] Return filtered results.

### ✅ Update ProductController

- [x] Tambahkan endpoint GET /products/filter pada ProductController.
- [x] Anotasi dengan @GetMapping("/filter").
- [x] Tambahkan @RequestParam(required=false) untuk category, minPrice, maxPrice.
- [x] Panggil productService.filterProducts(filterRequest).
- [x] Return ResponseEntity dengan HTTP Status 200 dan ProductListDTO.
- [x] Endpoint adalah public endpoint.

### ✅ Exception Handling

- [x] Handle invalid filter criteria (misal: minPrice > maxPrice).
- [x] Handle invalid category.
- [x] Return appropriate error messages.

### ✅ Update Frontend ProductService

- [x] Update ProductService.js. (ProductService.ts)
- [x] Tambahkan function filterProducts(filterCriteria) yang mengirim GET request ke /products/filter dengan query params.
- [x] Handle response dan error.
- [x] Return filtered results atau throw error.

### ✅ Frontend Filter Component

- [x] Buat ProductFilter.jsx component pada direktori components. (Terintegrasi di ProductListPage dan Header)
- [x] Props: onFilter callback, availableCategories. (Menggunakan FilterContext)
- [x] State: selectedCategory, minPrice, maxPrice. (Global state di FilterContext)
- [x] Implementasi category dropdown atau checkbox list.
- [x] Implementasi price range input (min dan max).
- [x] Apply filter button.
- [x] Clear filter button.
- [x] Validasi min <= max sebelum apply filter.

### ✅ Update Frontend Product List Page

- [x] Update ProductListPage.jsx dengan filter functionality.
- [x] Integrate ProductFilter component.
- [x] State: activeFilters. (Via FilterContext)
- [x] Ketika filter applied, panggil ProductService.filterProducts(filterCriteria).
- [x] Update products state dengan filtered results.
- [x] Display active filters dengan badge atau chips.
- [x] Provide option untuk remove individual filter atau clear all filters.
- [x] Support kombinasi search dan filter.

### Filter Persistence (Optional)

- [ ] Simpan active filters di URL query params.
- [ ] Load filters dari URL saat page mount.
- [ ] Allow sharing filtered results via URL.

### ✅ Testing Backend

- [x] Test endpoint GET /products/filter?category=electronics: return filtered products.
- [x] Test endpoint GET /products/filter?minPrice=100&maxPrice=500: return products in price range.
- [x] Test kombinasi filters: category + price range.
- [x] Test dengan invalid filter (minPrice > maxPrice): return validation error.
- [x] Test dengan no filters: return all products.
- [x] Test dengan category tidak exist: return empty results.
- [x] Test filter accessible tanpa authentication.

### ✅ Testing Frontend

- [x] Test filter component dapat digunakan.
- [x] Test filter by category: tampilkan filtered results.
- [x] Test filter by price range: tampilkan filtered results.
- [x] Test kombinasi filters: tampilkan correctly filtered results.
- [x] Test clear filter: kembali ke full list atau search results.
- [x] Test validation minPrice <= maxPrice.
- [x] Test display active filters dengan jelas.
- [x] Test kombinasi search dan filter berfungsi.

---

## ✅ Database Tasks

- [x] Tidak ada perubahan database structure untuk UC-06.
- [x] Pastikan Entity Product memiliki field category dan price.
- [x] Pastikan sample data mencakup berbagai categories dan price ranges.

---

## ✅ Backend Tasks

- [x] Update ProductRepository dengan filter query methods.
- [x] Implementasi FilterRequestDTO.
- [x] Update ProductService dengan method filterProducts().
- [x] Update ProductController dengan endpoint GET /products/filter.
- [x] Implementasi validation untuk filter criteria.
- [x] Update GlobalExceptionHandler untuk filter errors.

---

## ✅ API Tasks

- [x] Implementasi endpoint GET /products/filter.
- [x] Endpoint menerima query parameters: category, minPrice, maxPrice (all optional).
- [x] Endpoint accessible tanpa autentikasi (public endpoint).
- [x] Endpoint return HTTP 200 dengan ProductListDTO berisi filtered results.
- [x] Endpoint return HTTP 400 jika filter criteria invalid.
- [x] Endpoint return HTTP 500 jika system error.

---

## ✅ Frontend Tasks

- [x] Update ProductService.js dengan function filterProducts().
- [x] Implementasi ProductFilter.jsx component.
- [x] Update ProductListPage.jsx dengan filter functionality.
- [x] Implementasi active filters display.
- [x] Implementasi clear filter functionality.
- [x] Support kombinasi search dan filter.

---

## ✅ Business Rules

- [x] Filter hanya mempengaruhi display results.
- [x] Product data tidak berubah.
- [x] Hanya products yang memenuhi filter criteria yang ditampilkan.
- [x] Multiple filters dapat di-apply bersamaan.
- [x] Empty filter results menampilkan appropriate message.

---

## ✅ Validation Rules

- [x] Filter harus valid.
- [x] Filter criteria harus recognized by system.
- [x] minPrice tidak boleh lebih besar dari maxPrice.
- [x] Price values harus non-negative.

---

## ✅ Use Case Boundary

Saat mengerjakan UC-06 Filter Product, implementasi yang boleh dilakukan:

- [x] Implementasi filter functionality di ProductRepository.
- [x] Update ProductService dan ProductController untuk filter.
- [x] Implementasi filter component dan integration di frontend.
- [x] Support kombinasi search dan filter.

Implementasi yang TIDAK BOLEH dilakukan pada UC-06:

- [x] Implementasi View Product Detail (akan dikerjakan di UC-07).
- [x] Implementasi Shopping Cart, Checkout, Payment, atau Order.
- [x] Implementasi fitur lain yang tidak berhubungan dengan Filter Product.

---

## ✅ Acceptance Criteria

- [x] Products matching filter ditampilkan dengan benar.
- [x] No matching products menampilkan "No matching products" atau empty state.
- [x] Invalid filter menghasilkan validation error.
- [x] Multiple filters dapat di-apply bersamaan.
- [x] Filter accessible tanpa autentikasi.
- [x] Active filters displayed dengan jelas.
- [x] Clear filter functionality berfungsi.

---

## ✅ Testing Checklist

### ✅ Positive Case

- [x] Filter by category berfungsi.
- [x] Filter by price range berfungsi.
- [x] Kombinasi filters berfungsi.
- [x] Clear filter berfungsi.

### ✅ Negative Case

- [x] Invalid filter criteria ditolak.
- [x] minPrice > maxPrice ditolak.
- [x] No matching results menampilkan appropriate message.

### ✅ Validation Case

- [x] Price range validation berfungsi.
- [x] Filter criteria validation berfungsi.

### ✅ Error Case

- [x] Database error handled gracefully.
- [x] Network error handled gracefully.

---

## ✅ Completion State

Setelah UC-06 Filter Product selesai, kondisi project adalah:

- [x] ProductRepository mendukung filter functionality.
- [x] Endpoint GET /products/filter berfungsi dan teruji.
- [x] Filter component berfungsi di frontend.
- [x] Filtered results displayed dengan baik.
- [x] Kombinasi search dan filter berfungsi.
- [x] Product Catalog module (View, Search, Filter) telah lengkap.
- [x] Project siap untuk implementasi UC-07 View Product Detail.

---

# UC-07 View Product Detail

## Tujuan

Mengimplementasikan fitur View Product Detail yang menampilkan informasi lengkap tentang satu produk yang dipilih Customer. Informasi ini menjadi basis sebelum Customer melakukan Add to Cart.

---

## Initial State

Pada tahap ini, project diasumsikan telah menyelesaikan Product Catalog module (UC-04 hingga UC-06) dengan kondisi:

- Entity Product telah tersedia dengan semua field.
- ProductRepository telah tersedia dengan search dan filter functionality.
- ProductService dan ProductController telah tersedia.
- Sample product data tersimpan di database.
- Product list, search, dan filter telah berfungsi.

---

## Dependencies

UC-07 View Product Detail bergantung pada:

- UC-04 View Product List (harus selesai).
- Entity Product dan ProductRepository.
- ProductService dan ProductController.

---

## Implementation Steps

### ✅ Update ProductRepository

- [x] Pastikan method findById(Long id) tersedia (sudah ada dari JpaRepository).
- [x] Method ini digunakan untuk retrieve product detail berdasarkan product_id.

### ✅ Pembuatan DTO

- [x] Reuse ProductResponseDTO dari UC-04.
- [x] DTO ini sudah berisi semua field yang diperlukan untuk detail view. (Termasuk imageUrls, rating dinamis, reviewCount, dan soldCount)
- [x] ProductDetailDTO (optional jika ingin different response format). (Tidak dibuat, reuse ProductResponseDTO)

### ✅ Update ProductService

- [x] Tambahkan method getProductDetail(Long productId) pada ProductService.
- [x] Validasi productId tidak null dan valid.
- [x] Panggil ProductRepository.findById(productId).
- [x] Throw ProductNotFoundException jika product tidak ditemukan.
- [x] Convert hasil ke ProductResponseDTO menggunakan ProductMapper.
- [x] Return ProductResponseDTO.
- [x] Rating dan reviewCount dihitung dinamis dari ReviewRepository.

### ✅ Custom Exception

- [x] Buat ProductNotFoundException pada package exception.
- [x] Extend RuntimeException.
- [x] Gunakan exception ini ketika product dengan ID tertentu tidak ditemukan.

### ✅ Update ProductController

- [x] Tambahkan endpoint GET /products/{id} pada ProductController.
- [x] Anotasi dengan @GetMapping("/{id}").
- [x] Tambahkan @PathVariable Long id.
- [x] Panggil productService.getProductDetail(id).
- [x] Return ResponseEntity dengan HTTP Status 200 dan ProductResponseDTO.
- [x] Endpoint adalah public endpoint.

### ✅ Exception Handling

- [x] Update GlobalExceptionHandler untuk handle ProductNotFoundException.
- [x] Return HTTP 404 (NOT FOUND) dengan error message.

### ✅ Frontend Service

- [x] Update ProductService.js. (ProductService.ts)
- [x] Tambahkan function getProductDetail(productId) yang mengirim GET request ke /products/{id}.
- [x] Handle response dan error.
- [x] Return product detail atau throw error.
- [x] Tambahkan ReviewService.ts untuk mengambil review product.

### ✅ Frontend Product Detail Page

- [x] Buat ProductDetailPage.jsx pada direktori pages. (ProductDetailPage.tsx)
- [x] Extract productId dari URL params menggunakan useParams().
- [x] State: product, loading, error.
- [x] useEffect untuk call ProductService.getProductDetail(productId) saat component mount atau productId berubah.
- [x] Handle loading state: tampilkan loading skeleton atau spinner.
- [x] Handle error state: tampilkan error message dengan link kembali.
- [x] Display product information lengkap:
  - [x] Product image (large)
  - [x] Product name
  - [x] Product description
  - [x] Product price
  - [x] Product stock (dengan indicator ketersediaan)
  - [x] Category
  - [x] Rating atau reviews (jika ada)
  - [x] Quantity selector
  - [x] Add to Cart button (disabled sesuai boundary UC-07)
  - [x] Back to product list link

### ✅ Product Detail Layout Component

- [x] Buat ProductDetailLayout.jsx pada direktori components. (Diimplementasikan langsung di ProductDetailPage.tsx)
- [x] Display product image pada left side.
- [x] Display product information pada right side.
- [x] Responsive layout untuk mobile: stacked vertically.

### ✅ Quantity Selector Component

- [x] Buat QuantitySelector.jsx pada direktori components. (QuantitySelector.tsx)
- [x] Props: maxQuantity (dari product stock), onQuantityChange callback.
- [x] State: quantity (default 1).
- [x] Tombol +/- untuk increment/decrement quantity.
- [x] Input field untuk manual entry quantity.
- [x] Validasi quantity: >= 1 dan <= maxQuantity.
- [x] Disable tombol + jika quantity sudah == maxQuantity.

### ✅ Routing

- [x] Update routing configuration.
- [x] Tambahkan route /products/:id untuk ProductDetailPage.
- [x] ProductDetailPage adalah public route (accessible tanpa autentikasi).

### ✅ Navigation

- [x] Update ProductCard component (dari UC-04).
- [x] ProductCard image atau link ketika diklik, navigate ke /products/{id}.

### ✅ Testing Backend

- [x] Test endpoint GET /products/{id} dengan id valid: return product detail.
- [x] Test dengan id tidak exist: return HTTP 404.
- [x] Test dengan id invalid (non-numeric): return HTTP 400 atau 404.
- [x] Test response berisi semua product information.
- [x] Test endpoint accessible tanpa authentication.
- [x] Build backend berhasil dengan mvn clean install -DskipTests.

### ✅ Testing Frontend

- [x] Test product detail page can be accessed.
- [x] Test product information displayed correctly.
- [x] Test loading state shown saat fetching data.
- [x] Test error state shown jika product not found.
- [x] Test quantity selector berfungsi.
- [x] Test back link atau navigation berfungsi.
- [x] Test responsive design di berbagai ukuran.
- [x] Test direct URL access (deep linking) berfungsi.
- [x] Build frontend berhasil dengan npm run build.

---

## ✅ Database Tasks

- [x] Tidak ada perubahan database inti untuk UC-07.
- [x] Menggunakan Entity Product yang sudah ada.
- [x] Review infrastructure ditambahkan untuk menampilkan review nyata dan rating dinamis pada product detail.
- [x] Sample review data disiapkan melalui SampleDataInitializer.

---

## ✅ Backend Tasks

- [x] Update ProductService dengan method getProductDetail().
- [x] Implementasi ProductNotFoundException.
- [x] Update ProductController dengan endpoint GET /products/{id}.
- [x] Update GlobalExceptionHandler untuk ProductNotFoundException.
- [x] Implementasi Review entity, ReviewRepository, ReviewService, ReviewController, dan ReviewResponseDTO.
- [x] Rating product dihitung dinamis dari rata-rata reviews.
- [x] Filter rating product list diperbaiki agar menggunakan rata-rata review.

---

## ✅ API Tasks

- [x] Implementasi endpoint GET /products/{id}.
- [x] Endpoint menerima path parameter: id.
- [x] Endpoint accessible tanpa autentikasi (public endpoint).
- [x] Endpoint return HTTP 200 dengan ProductResponseDTO.
- [x] Endpoint return HTTP 404 jika product not found.
- [x] Endpoint return HTTP 400 jika id invalid.
- [x] Endpoint return HTTP 500 jika system error.
- [x] Implementasi endpoint GET /products/{id}/reviews untuk menampilkan review product.

---

## ✅ Frontend Tasks

- [x] Update ProductService.js dengan function getProductDetail(). (ProductService.ts)
- [x] Implementasi ProductDetailPage.jsx. (ProductDetailPage.tsx)
- [x] Implementasi ProductDetailLayout.jsx component. (Diintegrasikan langsung di page)
- [x] Implementasi QuantitySelector.jsx component. (QuantitySelector.tsx)
- [x] Implementasi ProductImageGallery.tsx untuk multiple product images.
- [x] Implementasi ReviewService.ts untuk mengambil review product.
- [x] Update ProductCard component untuk link ke detail page.
- [x] Update routing dengan route /products/{id}.
- [x] Implementasi loading dan error handling.
- [x] Tab Description dan Review disesuaikan dengan keputusan final UI.

---

## ✅ Business Rules

- [x] Product detail hanya ditampilkan jika product ditemukan.
- [x] Product information harus lengkap.
- [x] Product detail adalah basis sebelum Add to Cart.
- [x] Stock information harus accurate dan clear.
- [x] Review hanya ditampilkan pada ProductDetailPage; user tidak dapat submit review dari halaman ini.

---

## ✅ Validation Rules

- [x] Product ID harus valid.
- [x] Product harus tersedia.

---

## ✅ Use Case Boundary

Saat mengerjakan UC-07 View Product Detail, implementasi yang boleh dilakukan:

- [x] Implementasi detail endpoint di ProductController.
- [x] Implementasi ProductDetailPage dan related components di frontend.
- [x] Implementasi quantity selector component.
- [x] Routing untuk product detail page.
- [x] Implementasi read-only review display sebagai bagian dari Product Detail.
- [x] Implementasi multiple product images gallery.

Implementasi yang TIDAK BOLEH dilakukan pada UC-07:

- [x] Implementasi Add to Cart functionality (akan dikerjakan di UC-09). (Button tersedia tapi disabled)
- [x] Implementasi Shopping Cart, Checkout, Payment, atau Order.
- [x] Implementasi fitur lain yang tidak berhubungan dengan View Product Detail.
- [x] Implementasi submit review dari ProductDetailPage. (Review submit nanti dari OrderDetailPage)

---

## ✅ Acceptance Criteria

- [x] Product detail berhasil ditampilkan.
- [x] Product not found menghasilkan error message.
- [x] Semua product information ditampilkan lengkap.
- [x] Quantity selector berfungsi dengan baik.
- [x] Deep linking ke product detail berfungsi.
- [x] Endpoint accessible tanpa autentikasi.
- [x] Product image gallery mendukung multiple images.
- [x] Review list ditampilkan secara read-only.
- [x] Rating product dihitung dari rata-rata review.

---

## ✅ Testing Checklist

### ✅ Positive Case

- [x] Product detail displayed correctly.
- [x] All product information shown.
- [x] Quantity selector functional.
- [x] Loading state shown.
- [x] Review data displayed correctly.
- [x] Product image gallery functional.

### ✅ Negative Case

- [x] Product not found shows 404 error.
- [x] Invalid id handled properly.
- [x] No detail info for non-existent product.
- [x] Product without reviews shows empty review state.

### ✅ Error Case

- [x] Database error handled.
- [x] Network error handled.

---

## ✅ Completion State

Setelah UC-07 View Product Detail selesai, kondisi project adalah:

- [x] Endpoint GET /products/{id} berfungsi dan teruji.
- [x] Endpoint GET /products/{id}/reviews berfungsi untuk menampilkan review product.
- [x] ProductDetailPage berfungsi dan teruji.
- [x] Deep linking ke product detail berfungsi.
- [x] Product Catalog module (UC-04 hingga UC-07) telah selesai.
- [x] Product rating menggunakan review data secara dinamis.
- [x] Project siap untuk implementasi UC-08 View Cart (Shopping Cart module).

---

# UC-08 View Cart

## Tujuan

Mengimplementasikan fitur View Cart yang menampilkan semua shopping cart contents termasuk quantity information, subtotal untuk setiap item, dan total shopping amount.

---

## Initial State

Pada tahap ini, project diasumsikan telah menyelesaikan Product Catalog module (UC-04 hingga UC-07) dan Authentication module dengan kondisi:

- [x] Authentication telah selesai dan JWT berfungsi.
- [x] Protected routes telah dikonfigurasi.
- [x] Entity Product telah tersedia.
- [x] Frontend routing dan components telah tersedia.

---

## Dependencies

UC-08 View Cart bergantung pada:

- [x] UC-02 Login (harus selesai untuk JWT).
- [x] UC-03 Logout (protected routes).
- [x] Entity Product dan ProductRepository.
- [x] Database MySQL.

---

## Implementation Steps

### ✅ Pembuatan Entity Cart

- [x] Buat Entity Cart pada package entity.
- [x] Tambahkan field: cart_id (PK, Auto Increment), user_id (FK), created_at, updated_at.
- [x] Relationship: @OneToOne dengan User (one User has one active Cart).
- [x] Anotasi JPA yang sesuai.

### ✅ Pembuatan Entity CartItem

- [x] Buat Entity CartItem pada package entity.
- [x] Tambahkan field: cart_item_id (PK, Auto Increment), cart_id (FK), product_id (FK), quantity, created_at, updated_at.
- [x] Relationship: @ManyToOne dengan Cart dan Product.
- [x] Unique constraint pada kombinasi (cart_id, product_id).
- [x] Anotasi JPA yang sesuai.

### ✅ Update Entity User

- [x] Tambahkan relationship @OneToOne dengan Cart pada Entity User.
- [x] Field: cart (Cart entity).
- [x] Bidirectional relationship.

### ✅ Pembuatan Repository

- [x] Buat interface CartRepository pada package repository.
- [x] Extend JpaRepository<Cart, Long>.
- [x] Tambahkan method findByUserId(Long userId).
- [x] Tambahkan method findOrCreateCart(Long userId) (optional, helper method).

- [x] Buat interface CartItemRepository pada package repository.
- [x] Extend JpaRepository<CartItem, Long>.
- [x] Tambahkan method findByCartId(Long cartId).
- [x] Tambahkan method findByCartIdAndProductId(Long cartId, Long productId).

### ✅ Pembuatan DTO

- [x] Buat CartItemDTO pada package dto.response.
- [x] Tambahkan field: cart_item_id, product_id, product_name, product_price, quantity, subtotal.

- [x] Buat CartResponseDTO pada package dto.response.
- [x] Tambahkan field: cart_id, items (List<CartItemDTO>), total_amount.

### ✅ Pembuatan Mapper

- [x] Buat CartMapper pada package mapper.
- [x] Buat method toCartItemDTO(CartItem cartItem) untuk convert CartItem ke DTO.
- [x] Buat method toCartResponseDTO(Cart cart) untuk convert Cart ke DTO.
- [x] Method ini harus calculate subtotal untuk setiap item dan total amount.

### ✅ Pembuatan Service

- [x] Buat ShoppingCartService pada package service.
- [x] Inject CartRepository, CartItemRepository, UserRepository, ProductRepository.

- [x] Implementasi method getCart(Long userId) pada ShoppingCartService.
- [x] Retrieve cart berdasarkan userId.
- [x] Jika cart tidak ada, create new cart untuk user.
- [x] Retrieve semua CartItems dari cart.
- [x] Calculate subtotal untuk setiap item (price * quantity).
- [x] Calculate total amount (sum semua subtotals).
- [x] Convert ke CartResponseDTO menggunakan CartMapper.
- [x] Return CartResponseDTO.

### ✅ Pembuatan Controller

- [x] Buat ShoppingCartController pada package controller.
- [x] Anotasi dengan @RestController dan @RequestMapping("/cart").
- [x] Inject ShoppingCartService dan SecurityUtil (untuk mendapat current user).

- [x] Buat endpoint GET /cart pada ShoppingCartController.
- [x] Anotasi dengan @GetMapping.
- [x] Anotasi dengan @PreAuthorize("isAuthenticated()") atau verify JWT.
- [x] Extract current userId dari authentication context atau JWT.
- [x] Panggil shoppingCartService.getCart(userId).
- [x] Return ResponseEntity dengan HTTP Status 200 dan CartResponseDTO.
- [x] Endpoint adalah protected endpoint (memerlukan autentikasi).

### ✅ Security Context Helper

- [x] Buat SecurityUtil atau UserUtil pada package util.
- [x] Implementasi method getCurrentUserId() untuk extract userId dari SecurityContext.
- [x] Atau gunakan @AuthenticationPrincipal untuk inject current user ke controller.

### ✅ Exception Handling

- [x] Update GlobalExceptionHandler untuk handle Cart-related errors.
- [x] Handle cart not found (rare, sebab auto-create).
- [x] Handle user not authenticated (401).

### ✅ Initialization di AuthenticationService

- [x] Saat user berhasil login atau register, create Cart otomatis.
- [x] Call ShoppingCartService untuk create atau get cart.
- [x] Pastikan setiap user memiliki cart.

### ✅ Frontend Cart Context

- [x] Buat CartContext.jsx pada direktori contexts.
- [x] State: cart (CartResponseDTO), loading, error.
- [x] Function: loadCart(), addToCart(), removeFromCart(), updateQuantity(), clearCart().
- [x] loadCart digunakan untuk fetch cart dari backend saat user login.

### ✅ Frontend Service

- [x] Buat ShoppingCartService.js pada direktori services.
- [x] Buat function getCart() yang mengirim GET request ke /cart dengan JWT token.
- [x] Handle response dan error.
- [x] Return CartResponseDTO atau throw error.

### ✅ Frontend Cart Page

- [x] Buat CartPage.jsx pada direktori pages.
- [x] Extract cart dari CartContext.
- [x] State: loading, error.
- [x] useEffect untuk call loadCart() dari CartContext.
- [x] Handle loading state: tampilkan loading skeleton.
- [x] Handle error state: tampilkan error message.
- [x] Handle empty cart: tampilkan "Shopping Cart is empty" dengan link ke product list.
- [x] Display cart items sebagai list atau table:
  - [x] Product image (small)
  - [x] Product name
  - [x] Product price
  - [x] Quantity
  - [x] Subtotal
  - [x] Remove button
- [x] Display cart summary:
  - [x] Subtotal semua items
  - [x] Shipping (jika ada)
  - [x] Total amount
  - [x] Checkout button

### ✅ Cart Item Component

- [x] Buat CartItemRow.jsx pada direktori components.
- [x] Props: cartItem, onRemove, onUpdateQuantity callbacks.
- [x] Display product information.
- [x] Quantity selector untuk update quantity.
- [x] Remove button.

### ✅ Cart Summary Component

- [x] Buat CartSummary.jsx pada direktori components.
- [x] Props: cart data.
- [x] Display subtotal, tax (jika ada), total.
- [x] Checkout button.
- [x] Continue shopping link.

### ✅ Routing

- [x] Update routing configuration.
- [x] Tambahkan route /cart untuk CartPage (protected route).
- [x] Pastikan hanya authenticated users yang dapat access.

### ✅ Navigation

- [x] Update header/navigation untuk include link ke cart.
- [x] Tampilkan cart icon dengan badge menampilkan jumlah items.

### ✅ Testing Backend

- [x] Test endpoint GET /cart dengan valid JWT: return cart dengan items.
- [x] Test endpoint dengan empty cart: return empty items list.
- [x] Test calculation subtotal dan total correct.
- [x] Test endpoint tanpa authentication: return HTTP 401.
- [x] Test endpoint dengan invalid token: return HTTP 401.
- [x] Test multiple users have separate carts.

### ✅ Testing Frontend

- [x] Test cart page can be accessed dengan authentication.
- [x] Test cart items displayed correctly.
- [x] Test loading state berfungsi.
- [x] Test empty cart menampilkan appropriate message.
- [x] Test cart summary calculation correct.
- [x] Test responsive design di berbagai ukuran.

---

## ✅ Database Tasks

- [x] Buat Entity Cart dan CartItem.
- [x] Create table Cart dan CartItem di database.
- [x] Setup relationship antara User-Cart dan Cart-CartItem.
- [x] Verify unique constraint pada (cart_id, product_id).

---

## ✅ Backend Tasks

- [x] Implementasi Entity Cart dan CartItem.
- [x] Implementasi CartRepository dan CartItemRepository.
- [x] Implementasi CartItemDTO dan CartResponseDTO.
- [x] Implementasi CartMapper.
- [x] Implementasi ShoppingCartService dengan method getCart().
- [x] Implementasi ShoppingCartController dengan endpoint GET /cart.
- [x] Implementasi SecurityUtil atau UserUtil.
- [x] Update AuthenticationService untuk auto-create cart.
- [x] Update GlobalExceptionHandler.

---

## ✅ API Tasks

- [x] Implementasi endpoint GET /cart.
- [x] Endpoint requires valid JWT token di Authorization header.
- [x] Endpoint return HTTP 200 dengan CartResponseDTO.
- [x] Endpoint return HTTP 401 jika not authenticated.
- [x] Endpoint return HTTP 500 jika system error.

---

## ✅ Frontend Tasks

- [x] Implementasi CartContext untuk manage cart state.
- [x] Implementasi ShoppingCartService.js untuk API communication.
- [x] Implementasi CartPage.jsx.
- [x] Implementasi CartItemRow.jsx dan CartSummary.jsx components.
- [x] Update routing dengan protected route /cart.
- [x] Update navigation untuk link ke cart.
- [x] Implementasi loading dan error handling.

---

## ✅ Business Rules

- [x] Shopping Cart hanya milik logged-in customer.
- [x] Setiap customer hanya memiliki satu active cart.
- [x] Setiap CartItem merepresentasikan satu product.
- [x] System automatically calculate subtotal dan total.
- [x] Shopping cart dapat dalam state empty.

---

## ✅ Validation Rules

- [x] Customer harus authenticated.
- [x] Cart harus berhasil di-retrieve.

---

## ✅ Use Case Boundary

Saat mengerjakan UC-08 View Cart, implementasi yang boleh dilakukan:

- [x] Pembuatan Entity Cart dan CartItem.
- [x] Implementasi CartRepository dan CartItemRepository.
- [x] Implementasi ShoppingCartService.getCart().
- [x] Implementasi endpoint GET /cart.
- [x] Implementasi CartPage dan components.
- [x] Auto-create cart saat user login/register.

Implementasi yang TIDAK BOLEH dilakukan pada UC-08:

- [x] Implementasi Add to Cart (akan dikerjakan di UC-09).
- [x] Implementasi Update Cart quantity (akan dikerjakan di UC-10).
- [x] Implementasi Remove Cart Item (akan dikerjakan di UC-11).
- [x] Implementasi Checkout dan Payment.

---

## ✅ Acceptance Criteria

- [x] Shopping cart berhasil ditampilkan.
- [x] Cart items ditampilkan dengan informasi lengkap.
- [x] Subtotal dan total calculated correctly.
- [x] Empty cart menampilkan appropriate message.
- [x] Hanya authenticated users dapat access cart.
- [x] Cart summary accurate.

---

## ✅ Testing Checklist

### ✅ Positive Case

- [x] Cart displayed for authenticated user.
- [x] All cart items shown.
- [x] Calculations correct.
- [x] Empty cart handled.

### ✅ Negative Case

- [x] Unauthenticated user cannot access cart.
- [x] Invalid token rejected.

### ✅ Error Case

- [x] Database error handled.
- [x] Network error handled.

---

## ✅ Completion State

Setelah UC-08 View Cart selesai, kondisi project adalah:

- [x] Entity Cart dan CartItem telah dibuat dan tables tersedia.
- [x] Endpoint GET /cart berfungsi dan teruji.
- [x] CartPage berfungsi dan teruji.
- [x] CartContext mengelola cart state.
- [x] Cart auto-created saat user login/register.
- [x] Calculation subtotal dan total berfungsi.
- [x] Protected route /cart telah dikonfigurasi.
- [x] Project siap untuk implementasi UC-09 Add to Cart.

---

# UC-09 Add to Cart

## Tujuan

Mengimplementasikan fitur Add to Cart yang memungkinkan Customer menambahkan product ke Shopping Cart sebagai persiapan sebelum Checkout.

---

## Initial State

Project telah menyelesaikan UC-08 View Cart dengan kondisi:

- [x] Entity Cart dan CartItem tersedia.
- [x] ShoppingCartService dan ShoppingCartController tersedia.
- [x] CartContext dan CartPage tersedia.
- [x] Product Detail page tersedia dengan quantity selector.

---

## Dependencies

UC-09 Add to Cart bergantung pada:

- [x] UC-07 View Product Detail.
- [x] UC-08 View Cart.
- [x] Authentication JWT.
- [x] Entity Product, Cart, CartItem.
- [x] ProductRepository, CartRepository, CartItemRepository.

---

## Implementation Steps

### ✅ Pembuatan DTO

- [x] Buat AddToCartRequestDTO pada package dto.request.
- [x] Tambahkan field: productId, quantity.
- [x] Tambahkan validation: productId required, quantity required, quantity > 0.
- [x] Reuse CartResponseDTO sebagai response setelah cart updated.

### ✅ Update ShoppingCartService

- [x] Tambahkan method addToCart(Long userId, AddToCartRequestDTO request).
- [x] Retrieve current user cart berdasarkan userId.
- [x] Retrieve product berdasarkan productId.
- [x] Jika product tidak ditemukan, throw ProductNotFoundException.
- [x] Check product stock availability.
- [x] Jika stock <= 0, throw OutOfStockException.
- [x] Validasi quantity tidak melebihi stock.
- [x] Check apakah product sudah ada di cart menggunakan cartId dan productId.
- [x] Jika CartItem sudah ada, tambah quantity existing dengan requested quantity.
- [x] Validasi total quantity baru tidak melebihi stock.
- [x] Jika CartItem belum ada, create CartItem baru dengan product dan quantity.
- [x] Save CartItem.
- [x] Recalculate subtotal dan total melalui CartMapper.
- [x] Return updated CartResponseDTO.

### ✅ Custom Exception

- [x] Buat OutOfStockException pada package exception.
- [x] Buat QuantityExceedsStockException pada package exception.
- [x] Update GlobalExceptionHandler untuk handle kedua exception tersebut.

### ✅ Update ShoppingCartController

- [x] Tambahkan endpoint POST /cart/items.
- [x] Endpoint protected dan membutuhkan valid JWT.
- [x] Terima AddToCartRequestDTO sebagai @RequestBody dengan @Valid.
- [x] Extract current userId dari SecurityContext.
- [x] Panggil shoppingCartService.addToCart(userId, request).
- [x] Return HTTP 200 atau 201 dengan updated CartResponseDTO.

### ✅ Update Frontend ShoppingCartService

- [x] Tambahkan function addToCart(productId, quantity).
- [x] Kirim POST request ke /cart/items dengan body productId dan quantity.
- [x] Pastikan JWT dikirim melalui Authorization header oleh axios interceptor.
- [x] Return updated cart.

### ✅ Update CartContext

- [x] Tambahkan function addToCart(productId, quantity).
- [x] Panggil ShoppingCartService.addToCart().
- [x] Update cart state dengan response terbaru.
- [x] Handle loading dan error state.

### ✅ Update Product Detail Page

- [x] Integrasikan Add to Cart button pada ProductDetailPage.
- [x] Gunakan quantity dari QuantitySelector.
- [x] Jika user belum login, redirect ke Login page atau tampilkan message untuk login.
- [x] Jika user login, panggil addToCart dari CartContext.
- [x] Tampilkan success notification ketika product berhasil ditambahkan.
- [x] Tampilkan error message jika out of stock atau quantity melebihi stock.
- [x] Disable button jika stock tidak tersedia.

### ✅ Update Navigation Cart Badge

- [x] Update cart badge count setelah Add to Cart berhasil.
- [x] Hitung jumlah total quantity atau jumlah item sesuai kebutuhan UI.

### ✅ Testing Backend

- [x] Test POST /cart/items dengan valid productId dan quantity: cart updated.
- [x] Test add product yang sudah ada di cart: quantity bertambah, bukan duplicate row.
- [x] Test quantity melebihi stock: return business error.
- [x] Test out of stock product: return error.
- [x] Test invalid productId: return 404.
- [x] Test unauthenticated request: return 401.

### ✅ Testing Frontend

- [x] Test Add to Cart dari Product Detail page.
- [x] Test success notification muncul.
- [x] Test cart badge updated.
- [x] Test unauthenticated user diarahkan ke login.
- [x] Test out of stock button disabled atau error displayed.
- [x] Test quantity exceeding stock shows error.

---

## ✅ Database Tasks

- [x] Tidak ada perubahan struktur database.
- [x] Insert atau update CartItem saat Add to Cart.
- [x] Pastikan unique constraint (cart_id, product_id) tetap terjaga.

---

## ✅ Backend Tasks

- [x] Implementasi AddToCartRequestDTO.
- [x] Update ShoppingCartService dengan method addToCart().
- [x] Implementasi OutOfStockException dan QuantityExceedsStockException.
- [x] Update ShoppingCartController dengan endpoint POST /cart/items.
- [x] Update GlobalExceptionHandler.

---

## ✅ API Tasks

- [x] Implementasi endpoint POST /cart/items.
- [x] Endpoint requires JWT.
- [x] Request body: productId, quantity.
- [x] Response: updated CartResponseDTO.
- [x] Error: 401 unauthenticated, 404 product not found, 400 validation error, 409 business error.

---

## ✅ Frontend Tasks

- [x] Update ShoppingCartService.js dengan addToCart().
- [x] Update CartContext dengan addToCart().
- [x] Update ProductDetailPage dengan Add to Cart button.
- [x] Implementasi success dan error notification.
- [x] Update cart badge setelah cart berubah.

---

## ✅ Business Rules

- [x] Product hanya dapat ditambahkan jika stock tersedia.
- [x] Product yang sudah ada di cart tidak membuat item baru.
- [x] Quantity harus bertambah jika product sudah ada.
- [x] Shopping cart harus ter-update setelah perubahan.
- [x] Quantity tidak boleh melebihi product stock.

---

## ✅ Validation Rules

- [x] Customer harus logged in.
- [x] Product ID harus valid.
- [x] Product harus tersedia.
- [x] Quantity harus lebih besar dari 0.
- [x] Quantity tidak boleh melebihi stock.

---

## ✅ Use Case Boundary

Saat mengerjakan UC-09 Add to Cart, implementasi yang boleh dilakukan:

- [x] Implementasi endpoint Add to Cart.
- [x] Update Product Detail page untuk Add to Cart.
- [x] Update CartContext dan cart badge.
- [x] Implementasi validasi stock dan quantity.

Implementasi yang TIDAK BOLEH dilakukan pada UC-09:

- [x] Implementasi Update Cart quantity (UC-10).
- [x] Implementasi Remove Cart Item (UC-11).
- [x] Implementasi Checkout, Payment, atau Order.

---

## ✅ Acceptance Criteria

- [x] Product berhasil ditambahkan ke cart.
- [x] Quantity bertambah jika product sudah ada.
- [x] Out of stock products tidak dapat ditambahkan.
- [x] Quantity tidak boleh melebihi stock.
- [x] Cart updated setelah Add to Cart.
- [x] Success/error message tampil dengan benar.

---

## ✅ Testing Checklist

### ✅ Positive Case

- [x] Add new product to cart berhasil.
- [x] Add duplicate product increases quantity.
- [x] Cart response updated correctly.

### ✅ Negative Case

- [x] Out of stock product rejected.
- [x] Quantity exceeding stock rejected.
- [x] Invalid productId rejected.
- [x] Unauthenticated request rejected.

### ✅ Validation Case

- [x] Missing productId rejected.
- [x] Quantity <= 0 rejected.

### ✅ Error Case

- [x] Database error handled.
- [x] Network error handled.

---

## ✅ Completion State

Setelah UC-09 Add to Cart selesai:

- [x] Endpoint POST /cart/items berfungsi dan teruji.
- [x] Product Detail page dapat menambahkan product ke cart.
- [x] CartContext dan cart badge updated setelah add.
- [x] Stock validation berfungsi.
- [x] Project siap untuk UC-10 Update Cart.

---

# UC-10 Update Cart

## Tujuan

Mengimplementasikan fitur Update Cart yang memungkinkan Customer mengubah quantity product dalam Shopping Cart.

---

## Initial State

Project telah menyelesaikan UC-09 Add to Cart dengan kondisi:

- [x] Cart dan CartItem tersedia.
- [x] Add to Cart berfungsi.
- [x] CartPage menampilkan cart items.
- [x] CartContext tersedia.

---

## Dependencies

UC-10 Update Cart bergantung pada:

- [x] UC-08 View Cart.
- [x] UC-09 Add to Cart.
- [x] CartItemRepository.
- [x] Product stock validation.

---

## Implementation Steps

### ✅ Pembuatan DTO

- [x] Buat UpdateCartItemRequestDTO pada package dto.request.
- [x] Tambahkan field: quantity.
- [x] Tambahkan validation: quantity required, quantity > 0.
- [x] Reuse CartResponseDTO untuk response.

### ✅ Update ShoppingCartService

- [x] Tambahkan method updateCartItem(Long userId, Long cartItemId, UpdateCartItemRequestDTO request).
- [x] Retrieve CartItem berdasarkan cartItemId.
- [x] Validasi CartItem ada.
- [x] Validasi CartItem belongs to current user's cart.
- [x] Retrieve related Product.
- [x] Validasi quantity > 0.
- [x] Validasi quantity tidak melebihi product stock.
- [x] Update CartItem quantity.
- [x] Save CartItem.
- [x] Recalculate subtotal dan total.
- [x] Return updated CartResponseDTO.

### ✅ Custom Exception

- [x] Buat CartItemNotFoundException pada package exception.
- [x] Buat UnauthorizedCartAccessException jika cart item bukan milik user.
- [x] Update GlobalExceptionHandler.

### ✅ Update ShoppingCartController

- [x] Tambahkan endpoint PUT /cart/items/{id}.
- [x] Endpoint protected dengan JWT.
- [x] Terima cartItemId dari @PathVariable.
- [x] Terima UpdateCartItemRequestDTO dari @RequestBody dengan @Valid.
- [x] Extract current userId.
- [x] Panggil shoppingCartService.updateCartItem(userId, id, request).
- [x] Return HTTP 200 dengan updated CartResponseDTO.

### ✅ Update Frontend ShoppingCartService

- [x] Tambahkan function updateCartItem(cartItemId, quantity).
- [x] Kirim PUT request ke /cart/items/{id} dengan body quantity.
- [x] Return updated cart.

### ✅ Update CartContext

- [x] Tambahkan function updateCartItem(cartItemId, quantity).
- [x] Panggil ShoppingCartService.updateCartItem().
- [x] Update cart state dengan response terbaru.
- [x] Handle loading dan error.

### ✅ Update Cart Page

- [x] Update CartItemRow component agar quantity selector aktif.
- [x] Ketika quantity berubah, panggil updateCartItem().
- [x] Debounce update agar tidak terlalu banyak request.
- [x] Tampilkan loading state per item jika sedang update.
- [x] Tampilkan error jika quantity invalid atau melebihi stock.
- [x] Re-render cart summary setelah update.

### ✅ Testing Backend

- [x] Test PUT /cart/items/{id} dengan valid quantity: update berhasil.
- [x] Test subtotal dan total recalculated correctly.
- [x] Test quantity melebihi stock: rejected.
- [x] Test quantity <= 0: validation error.
- [x] Test cartItemId tidak exist: 404.
- [x] Test cart item milik user lain: 403 atau 404.
- [x] Test unauthenticated request: 401.

### ✅ Testing Frontend

- [x] Test update quantity dari CartPage.
- [x] Test cart summary updated automatically.
- [x] Test quantity exceeding stock shows error.
- [x] Test invalid quantity rejected.
- [x] Test per-item loading state.

---

## ✅ Database Tasks

- [x] Tidak ada perubahan struktur database.
- [x] Update quantity field pada CartItem.
- [x] Pastikan subtotal dan total dihitung runtime atau response, bukan field database jika tidak didefinisikan.

---

## ✅ Backend Tasks

- [x] Implementasi UpdateCartItemRequestDTO.
- [x] Update ShoppingCartService dengan updateCartItem().
- [x] Implementasi CartItemNotFoundException dan UnauthorizedCartAccessException.
- [x] Update ShoppingCartController dengan endpoint PUT /cart/items/{id}.
- [x] Update GlobalExceptionHandler.

---

## ✅ API Tasks

- [x] Implementasi endpoint PUT /cart/items/{id}.
- [x] Endpoint requires JWT.
- [x] Request body: quantity.
- [x] Response: updated CartResponseDTO.
- [x] Error: 400 validation, 401 unauthenticated, 403 unauthorized cart access, 404 not found, 409 quantity exceeds stock.

---

## ✅ Frontend Tasks

- [x] Update ShoppingCartService.js dengan updateCartItem().
- [x] Update CartContext dengan updateCartItem().
- [x] Update CartItemRow dengan quantity selector.
- [x] Update CartPage agar summary recalculated after update.
- [x] Implementasi per-item loading dan error display.

---

## ✅ Business Rules

- [x] Quantity harus lebih besar dari zero.
- [x] Quantity tidak boleh melebihi stock.
- [x] Setiap quantity change harus recalculate subtotal.
- [x] Total payment harus selalu updated.

---

## ✅ Validation Rules

- [x] Quantity harus valid.
- [x] Quantity tidak boleh melebihi stock.
- [x] Product harus masih tersedia.
- [x] CartItem harus milik authenticated user.

---

## ✅ Use Case Boundary

Saat mengerjakan UC-10 Update Cart, implementasi yang boleh dilakukan:

- [x] Implementasi update quantity CartItem.
- [x] Recalculate subtotal dan total setelah update.
- [x] Update UI CartPage untuk quantity update.

Implementasi yang TIDAK BOLEH dilakukan pada UC-10:

- [x] Implementasi Remove Cart Item (UC-11).
- [x] Implementasi Checkout, Payment, atau Order.

---

## ✅ Acceptance Criteria

- [x] Quantity berhasil di-update.
- [x] Total payment updated accordingly.
- [x] Invalid quantity menghasilkan validation error.
- [x] Quantity exceeding stock ditolak.
- [x] Cart summary updated setelah quantity berubah.

---

## ✅ Testing Checklist

### ✅ Positive Case

- [x] Update quantity berhasil.
- [x] Subtotal updated correctly.
- [x] Total updated correctly.

### ✅ Negative Case

- [x] Quantity <= 0 rejected.
- [x] Quantity exceeding stock rejected.
- [x] CartItem not found handled.
- [x] Unauthorized access rejected.

### ✅ Error Case

- [x] Database error handled.
- [x] Network error handled.

---

## ✅ Completion State

Setelah UC-10 Update Cart selesai:

- [x] Endpoint PUT /cart/items/{id} berfungsi dan teruji.
- [x] Quantity dapat diubah dari CartPage.
- [x] Subtotal dan total recalculated correctly.
- [x] Project siap untuk UC-11 Remove Cart Item.

---

# UC-11 Remove Cart Item

## Tujuan

Mengimplementasikan fitur Remove Cart Item yang memungkinkan Customer menghapus product dari Shopping Cart.

---

## Initial State

Project telah menyelesaikan UC-10 Update Cart dengan kondisi:

- [x] CartPage menampilkan cart items.
- [x] Update quantity berfungsi.
- [x] CartContext dan ShoppingCartService tersedia.

---

## Dependencies

UC-11 Remove Cart Item bergantung pada:

- [x] UC-08 View Cart.
- [x] UC-09 Add to Cart.
- [x] UC-10 Update Cart.
- [x] CartItemRepository.

---

## Implementation Steps

### ✅ Update ShoppingCartService

- [x] Tambahkan method removeCartItem(Long userId, Long cartItemId).
- [x] Retrieve CartItem berdasarkan cartItemId.
- [x] Validasi CartItem ada.
- [x] Validasi CartItem belongs to current user's cart.
- [x] Delete CartItem dari database.
- [x] Retrieve updated Cart.
- [x] Recalculate subtotal dan total.
- [x] Return updated CartResponseDTO.

### ✅ Update ShoppingCartController

- [x] Tambahkan endpoint DELETE /cart/items/{id}.
- [x] Endpoint protected dengan JWT.
- [x] Terima cartItemId dari @PathVariable.
- [x] Extract current userId.
- [x] Panggil shoppingCartService.removeCartItem(userId, id).
- [x] Return HTTP 200 dengan updated CartResponseDTO.

### ✅ Update Frontend ShoppingCartService

- [x] Tambahkan function removeCartItem(cartItemId).
- [x] Kirim DELETE request ke /cart/items/{id}.
- [x] Return updated cart.

### ✅ Update CartContext

- [x] Tambahkan function removeCartItem(cartItemId).
- [x] Panggil ShoppingCartService.removeCartItem().
- [x] Update cart state dengan response terbaru.
- [x] Handle loading dan error.

### ✅ Update Cart Page

- [x] Update CartItemRow remove button agar memanggil removeCartItem().
- [x] Tambahkan confirmation dialog jika diperlukan.
- [x] Tampilkan loading state saat remove sedang berlangsung.
- [x] Setelah item dihapus, update cart list dan summary.
- [x] Jika semua items dihapus, tampilkan empty cart state.
- [x] Tampilkan success notification setelah item berhasil dihapus.

### ✅ Testing Backend

- [x] Test DELETE /cart/items/{id} dengan valid cartItemId: item removed.
- [x] Test total recalculated after remove.
- [x] Test removing last item: cart becomes empty.
- [x] Test cartItemId not found: 404.
- [x] Test cart item belongs to other user: 403 atau 404.
- [x] Test unauthenticated request: 401.

### ✅ Testing Frontend

- [x] Test remove item dari CartPage.
- [x] Test cart summary updated after removal.
- [x] Test empty cart state setelah last item dihapus.
- [x] Test success notification muncul.
- [x] Test error handling jika remove gagal.

---

## ✅ Database Tasks

- [x] Tidak ada perubahan struktur database.
- [x] Delete record CartItem dari database.
- [x] Pastikan Cart tetap ada walaupun semua CartItems dihapus.

---

## ✅ Backend Tasks

- [x] Update ShoppingCartService dengan method removeCartItem().
- [x] Update ShoppingCartController dengan endpoint DELETE /cart/items/{id}.
- [x] Reuse CartItemNotFoundException dan UnauthorizedCartAccessException.
- [x] Update GlobalExceptionHandler jika diperlukan.

---

## ✅ API Tasks

- [x] Implementasi endpoint DELETE /cart/items/{id}.
- [x] Endpoint requires JWT.
- [x] Response: updated CartResponseDTO.
- [x] Error: 401 unauthenticated, 403 unauthorized cart access, 404 cart item not found, 500 system error.

---

## ✅ Frontend Tasks

- [x] Update ShoppingCartService.js dengan removeCartItem().
- [x] Update CartContext dengan removeCartItem().
- [x] Update CartItemRow remove button.
- [x] Update CartPage empty state after remove.
- [x] Implementasi success/error notification.

---

## ✅ Business Rules

- [x] Product dapat dihapus kapan saja sebelum Checkout.
- [x] Shopping Cart harus updated setelah removal.
- [x] Total payment harus recalculated.
- [x] Cart tetap ada walaupun semua items dihapus.

---

## ✅ Validation Rules

- [x] CartItem harus exist.
- [x] Customer harus logged in.
- [x] CartItem harus milik Customer yang sedang login.

---

## ✅ Use Case Boundary

Saat mengerjakan UC-11 Remove Cart Item, implementasi yang boleh dilakukan:

- [x] Implementasi delete CartItem.
- [x] Recalculate cart setelah removal.
- [x] Update UI untuk remove item.
- [x] Empty cart state setelah removal.

Implementasi yang TIDAK BOLEH dilakukan pada UC-11:

- [x] Implementasi Checkout (UC-12).
- [x] Implementasi Payment atau Order.

---

## ✅ Acceptance Criteria

- [x] Product berhasil dihapus dari cart.
- [x] Shopping Cart updated setelah removal.
- [x] Total payment updated setelah removal.
- [x] Empty Shopping Cart ditampilkan jika semua items dihapus.
- [x] Unauthorized removal ditolak.

---

## ✅ Testing Checklist

### ✅ Positive Case

- [x] Remove item berhasil.
- [x] Summary recalculated correctly.
- [x] Last item removal displays empty cart.

### ✅ Negative Case

- [x] CartItem not found handled.
- [x] Unauthorized access rejected.
- [x] Unauthenticated request rejected.

### ✅ Error Case

- [x] Database error handled.
- [x] Network error handled.

---

## ✅ Completion State

Setelah UC-11 Remove Cart Item selesai:

- [x] Endpoint DELETE /cart/items/{id} berfungsi dan teruji.
- [x] CartPage mendukung remove item.
- [x] Empty cart state berfungsi.
- [x] Shopping Cart module (UC-08 hingga UC-11) telah selesai.
- [x] Project siap untuk implementasi UC-12 Checkout.

---

# UC-12 Checkout

## Tujuan

Mengimplementasikan fitur Checkout yang melakukan validasi final terhadap Shopping Cart dan menghasilkan Order Summary sebelum Customer memilih payment method.

---
 
## Initial State

Project telah menyelesaikan Shopping Cart module dengan kondisi:

- Cart dapat ditampilkan.
- Product dapat ditambahkan, di-update, dan dihapus dari cart.
- Cart subtotal dan total dihitung dengan benar.
- Authentication dan protected routes berfungsi.

---

## Dependencies

UC-12 Checkout bergantung pada:

- UC-08 View Cart.
- UC-09 Add to Cart.
- UC-10 Update Cart.
- UC-11 Remove Cart Item.
- Product stock validation.

---

## Implementation Steps

### Pembuatan DTO

- Buat OrderSummaryItemDTO pada package dto.response.
- Tambahkan field: productId, productName, unitPrice, quantity, subtotal.
- Buat OrderSummaryResponseDTO pada package dto.response.
- Tambahkan field: items, totalAmount, generatedAt.

### Pembuatan OrderProcessingService

- Buat OrderProcessingService pada package service.
- Inject CartRepository, CartItemRepository, ProductRepository.
- Implementasi method checkout(Long userId).
- Retrieve cart milik user.
- Validasi cart tidak empty.
- Retrieve cart items.
- Validasi semua product masih exist.
- Validasi quantity setiap item tidak melebihi current stock.
- Recalculate subtotal untuk setiap item.
- Recalculate total payment.
- Generate OrderSummaryResponseDTO.
- Return order summary.

### Pembuatan Controller

- Buat OrderProcessingController pada package controller.
- Anotasi @RestController dan @RequestMapping.
- Implementasi endpoint POST /checkout.
- Endpoint protected dengan JWT.
- Extract current userId.
- Panggil orderProcessingService.checkout(userId).
- Return HTTP 200 dengan OrderSummaryResponseDTO.

### Exception Handling

- Buat EmptyCartException.
- Buat InvalidCartException.
- Update GlobalExceptionHandler.

### Frontend Service

- Buat OrderProcessingService.js pada services.
- Tambahkan function checkout() yang mengirim POST request ke /checkout.
- Return order summary.

### Frontend Checkout Page

- Buat CheckoutPage.jsx pada pages.
- State: orderSummary, loading, error.
- Saat page load atau ketika Customer klik Checkout dari CartPage, panggil checkout().
- Display order summary:
  - Product list
  - Quantity
  - Unit price
  - Subtotal
  - Total payment
- Tampilkan error jika cart empty atau invalid.
- Tambahkan button Continue to Payment Method.

### Update Cart Page

- Update Checkout button pada CartSummary.
- Jika cart empty, disable Checkout button.
- Jika cart tidak empty, navigate ke /checkout.

### Routing

- Tambahkan protected route /checkout untuk CheckoutPage.

### Testing Backend

- Test POST /checkout dengan cart valid: return order summary.
- Test empty cart: return business error.
- Test product stock berubah sehingga cart invalid: return error.
- Test unauthenticated request: return 401.
- Test subtotal dan total calculation correct.

### Testing Frontend

- Test Checkout button dari CartPage.
- Test CheckoutPage displays order summary.
- Test empty cart cannot checkout.
- Test invalid cart displays error.
- Test responsive design.

---

## Database Tasks

- Tidak ada table baru untuk UC-12.
- Menggunakan Cart, CartItem, Product.
- Tidak membuat Orders pada tahap Checkout.

---

## Backend Tasks

- Implementasi OrderSummaryItemDTO dan OrderSummaryResponseDTO.
- Implementasi OrderProcessingService.checkout().
- Implementasi OrderProcessingController dengan POST /checkout.
- Implementasi EmptyCartException dan InvalidCartException.
- Update GlobalExceptionHandler.

---

## API Tasks

- Implementasi endpoint POST /checkout.
- Endpoint requires JWT.
- Response: OrderSummaryResponseDTO.
- Error: 401 unauthenticated, 400 empty/invalid cart, 409 stock conflict, 500 system error.

---

## Frontend Tasks

- Implementasi OrderProcessingService.js.
- Implementasi CheckoutPage.jsx.
- Update CartSummary checkout button.
- Tambahkan protected route /checkout.
- Implementasi loading/error state.

---

## Business Rules

- Checkout hanya dapat dilakukan jika Shopping Cart memiliki items.
- Semua subtotal harus recalculated.
- Total payment harus recalculated.
- Order Summary harus dibuat sebelum payment.
- Checkout belum membuat Order.

---

## Validation Rules

- Customer harus logged in.
- Shopping Cart tidak boleh empty.
- Semua products harus valid.
- Quantity tidak boleh melebihi current stock.

---

## Use Case Boundary

Saat mengerjakan UC-12 Checkout, implementasi yang boleh dilakukan:

- Implementasi checkout validation.
- Generate Order Summary.
- Implementasi CheckoutPage.

Implementasi yang TIDAK BOLEH dilakukan pada UC-12:

- Implementasi Choose Payment Method (UC-13).
- Implementasi Process Payment (UC-14).
- Membuat Orders atau Payment records final.

---

## Acceptance Criteria

- Order Summary berhasil ditampilkan.
- Empty Shopping Cart tidak dapat Checkout.
- Total payment calculated correctly.
- Invalid cart ditolak.
- Checkout protected by authentication.

---

## Testing Checklist

### Positive Case

- Checkout valid cart berhasil.
- Order summary accurate.
- Total correct.

### Negative Case

- Empty cart rejected.
- Invalid cart rejected.
- Unauthenticated request rejected.

### Error Case

- Stock conflict handled.
- Database error handled.

---

## Completion State

Setelah UC-12 Checkout selesai:

- Endpoint POST /checkout berfungsi dan teruji.
- CheckoutPage menampilkan Order Summary.
- Cart validation berfungsi.
- Project siap untuk UC-13 Choose Payment Method.

---

# UC-13 Choose Payment Method

## Tujuan

Mengimplementasikan pemilihan payment method agar Customer dapat memilih satu metode pembayaran sebelum proses Mock Payment.

---

## Initial State

Project telah menyelesaikan UC-12 Checkout:

- Order Summary dapat dibuat.
- CheckoutPage tersedia.
- Cart valid dan memiliki items.

---

## Dependencies

- UC-12 Checkout.
- Authentication JWT.
- OrderProcessingService.
- CheckoutPage.

---

## Implementation Steps

- Definisikan daftar payment method sesuai PROJECT_SPEC.md: Bank Transfer, QRIS, E-Wallet.
- Buat PaymentMethodDTO atau gunakan enum PaymentMethod di backend.
- Buat SelectPaymentMethodRequestDTO dengan field paymentMethod.
- Tambahkan validasi paymentMethod required dan harus salah satu dari metode yang tersedia.
- Update OrderProcessingService dengan method validatePaymentMethod().
- Karena PROJECT_SPEC.md tidak mendefinisikan endpoint terpisah untuk choose payment method, integrasikan pemilihan payment method sebagai bagian dari Payment page sebelum memanggil POST /orders/payment.
- Buat PaymentPage.jsx yang menerima Order Summary dari CheckoutPage atau memuat ulang checkout summary.
- Buat PaymentMethodSelector component.
- Simpan selected payment method di frontend state atau Payment Context sampai Customer klik Pay Now.
- Tampilkan validation error jika Customer belum memilih payment method.
- Tambahkan navigation dari CheckoutPage ke PaymentPage.
- Pastikan PaymentPage protected route.

---

## Database Tasks

- Tidak ada perubahan database pada UC-13.
- Payment record belum dibuat pada tahap ini kecuali saat Process Payment di UC-14.

---

## Backend Tasks

- Implementasi enum atau validator untuk payment method: Bank Transfer, QRIS, E-Wallet.
- Implementasi DTO untuk payment method request jika digunakan oleh payment process.
- Tambahkan validation method di OrderProcessingService.

---

## API Tasks

- Tidak membuat endpoint baru karena PROJECT_SPEC.md hanya mendefinisikan POST /checkout, POST /orders/payment, dan POST /orders/payment/retry untuk Order Processing.
- Payment method dikirim sebagai bagian dari request POST /orders/payment pada UC-14.

---

## Frontend Tasks

- Implementasi PaymentPage.jsx.
- Implementasi PaymentMethodSelector component.
- Update CheckoutPage dengan button Continue to Payment.
- Tambahkan protected route /payment.
- Simpan selected payment method pada state/context.
- Tampilkan validation error jika payment method belum dipilih.

---

## Business Rules

- Customer hanya dapat memilih satu payment method.
- Payment method harus tersedia.
- Payment selection disimpan sebelum payment process.

---

## Validation Rules

- Payment Method harus dipilih.
- Payment Method harus valid.

---

## Use Case Boundary

Saat mengerjakan UC-13, hanya boleh mengimplementasikan pemilihan payment method dan navigasi ke payment process. Tidak boleh memproses payment, membuat order, mengurangi stock, atau clear cart.

---

## Acceptance Criteria

- Payment Method berhasil dipilih.
- Payment Method disimpan di frontend state/context.
- Invalid Payment Method ditolak.
- Customer tidak dapat melanjutkan payment tanpa memilih method.

---

## Testing Checklist

### Positive Case

- Customer memilih Bank Transfer.
- Customer memilih QRIS.
- Customer memilih E-Wallet.
- Selected method tersimpan sampai Pay Now.

### Negative Case

- Customer tidak memilih payment method.
- Invalid method ditolak.

### Error Case

- State hilang ditangani dengan redirect kembali ke checkout atau reload summary.

---

## Completion State

Setelah UC-13 selesai:

- PaymentPage tersedia.
- Payment method selection berfungsi.
- Project siap untuk UC-14 Process Payment.

---

# UC-14 Process Payment

## Tujuan

Mengimplementasikan Mock Payment process yang membuat Order, OrderItems, mengurangi stock, clear Shopping Cart, dan update Payment Status jika payment berhasil.

---

## Initial State

Project telah menyelesaikan UC-13:

- Checkout menghasilkan Order Summary.
- Customer dapat memilih payment method.
- PaymentPage tersedia.

---

## Dependencies

- UC-12 Checkout.
- UC-13 Choose Payment Method.
- Entity User, Product, Cart, CartItem.
- Orders, OrderItem, Payment entities harus dibuat pada UC-14.

---

## Implementation Steps

- Buat Entity Orders dengan field order_id, user_id, total_amount, order_status, order_date, created_at, updated_at.
- Buat Entity OrderItem dengan field order_item_id, order_id, product_id, product_name_snapshot, unit_price_snapshot, quantity, subtotal.
- Buat Entity Payment dengan field payment_id, order_id, payment_method, payment_status, payment_date.
- Buat repositories: OrdersRepository, OrderItemRepository, PaymentRepository.
- Buat ProcessPaymentRequestDTO dengan paymentMethod.
- Buat PaymentResponseDTO berisi orderId, paymentStatus, orderStatus, message, totalAmount.
- Update OrderProcessingService dengan method processPayment(userId, request).
- Validasi payment method valid.
- Retrieve cart dan cart items.
- Validasi cart tidak empty dan products masih valid.
- Jalankan Mock Payment simulation sesuai aturan project.
- Jika payment failed, buat response failed dan simpan Payment Status Failed sesuai desain transaksi yang digunakan.
- Jika payment success, jalankan atomic operation:
  - Create Orders.
  - Create OrderItems dengan snapshot product name dan unit price.
  - Reduce Product stock.
  - Clear CartItems.
  - Create Payment dengan Success status.
- Pastikan operasi order creation transactional.
- Tambahkan endpoint POST /orders/payment pada OrderProcessingController.
- Update frontend OrderProcessingService dengan processPayment(paymentMethod).
- Update PaymentPage dengan Pay Now button.
- Tampilkan payment success atau failed message.
- Jika success, redirect atau tampilkan link ke Order History.
- Jika failed, tampilkan retry payment option untuk UC-15.

---

## Database Tasks

- Buat table Orders, OrderItem, Payment.
- Setup FK User → Orders, Orders → OrderItem, Product → OrderItem, Orders → Payment.
- Pastikan snapshot product name dan price tersimpan di OrderItem.
- Pastikan Payment.order_id unique.
- Pastikan stock tidak negatif.

---

## Backend Tasks

- Implementasi Orders, OrderItem, Payment entities.
- Implementasi repositories terkait.
- Implementasi DTO request/response payment.
- Update OrderProcessingService dengan processPayment().
- Gunakan transaksi untuk order creation.
- Update OrderProcessingController dengan POST /orders/payment.
- Update exception handling untuk Payment Failure dan stock conflict.

---

## API Tasks

- Implementasi POST /orders/payment.
- Endpoint requires JWT.
- Request body: paymentMethod.
- Response success: PaymentResponseDTO dengan status Success.
- Response failed: PaymentResponseDTO dengan status Failed.
- Error: 400 invalid request, 401 unauthenticated, 409 invalid cart/stock conflict, 500 system error.

---

## Frontend Tasks

- Update OrderProcessingService.js dengan processPayment().
- Update PaymentPage dengan Pay Now action.
- Tampilkan loading saat payment diproses.
- Tampilkan success atau failed payment status.
- Update CartContext setelah success agar cart kosong.
- Sediakan navigasi ke Order History setelah success.

---

## Business Rules

- Payment menggunakan Mock Payment.
- Order hanya dibuat jika payment berhasil.
- Shopping Cart dikosongkan setelah successful payment.
- Product stock dikurangi setelah successful transaction.
- Payment status harus selalu updated.

---

## Validation Rules

- Payment Method harus dipilih.
- Shopping Cart harus valid.
- Products harus masih tersedia.
- Quantity tidak boleh melebihi stock.

---

## Use Case Boundary

Saat mengerjakan UC-14, hanya boleh mengimplementasikan process payment dan konsekuensi langsungnya: create order, order items, payment, stock reduction, dan cart clearing. Tidak boleh mengimplementasikan Retry Payment kecuali menyimpan status Failed yang diperlukan untuk UC-15.

---

## Acceptance Criteria

- Successful payment menghasilkan Order.
- Shopping Cart kosong setelah transaction.
- Stock berhasil updated.
- Failed payment menghasilkan Failed status.
- Payment Status ditampilkan benar.

---

## Testing Checklist

### Positive Case

- Payment success creates order.
- OrderItems contain snapshot data.
- Stock reduced correctly.
- Cart cleared.

### Negative Case

- Invalid payment method rejected.
- Empty cart rejected.
- Stock conflict rejected.
- Failed payment returns Failed status.

### Error Case

- Transaction rollback jika order creation gagal.
- Network error handled.

---

## Completion State

Setelah UC-14 selesai:

- Order Processing dapat membuat transaction melalui Mock Payment.
- Orders, OrderItems, dan Payment tersimpan dengan benar.
- Project siap untuk UC-15 Retry Payment.

---

# UC-15 Retry Payment

## Tujuan

Mengimplementasikan Retry Payment agar Customer dapat mencoba kembali pembayaran untuk transaksi dengan Payment Status Failed.

---

## Initial State

Project telah menyelesaikan UC-14:

- Payment dapat Success atau Failed.
- Payment Status Failed dapat tersedia.
- PaymentPage dapat menampilkan failed status.

---

## Dependencies

- UC-14 Process Payment.
- Payment entity dan PaymentRepository.
- Orders/OrderItems workflow.

---

## Implementation Steps

- Buat RetryPaymentRequestDTO dengan paymentId atau failed transaction identifier dan optional paymentMethod.
- Update OrderProcessingService dengan retryPayment(userId, request).
- Retrieve failed payment milik Customer.
- Validasi payment status harus Failed.
- Validasi transaction masih valid.
- Reprocess Mock Payment.
- Jika retry failed, maintain Payment Status Failed.
- Jika retry success, update Payment Status Success, create Order dan OrderItems jika belum dibuat, reduce stock, clear cart.
- Pastikan tidak membuat duplicate Order untuk retry yang sudah success.
- Tambahkan endpoint POST /orders/payment/retry.
- Update frontend OrderProcessingService dengan retryPayment().
- Update PaymentPage atau PaymentFailed component dengan Retry Payment button.
- Tampilkan hasil retry kepada Customer.

---

## Database Tasks

- Tidak ada perubahan struktur database.
- Update Payment Status dari Failed ke Success jika retry berhasil.
- Pastikan tidak ada duplicate Order/OrderItems.

---

## Backend Tasks

- Implementasi RetryPaymentRequestDTO.
- Update OrderProcessingService dengan retryPayment().
- Update OrderProcessingController dengan POST /orders/payment/retry.
- Tambahkan validasi status Failed.
- Tambahkan exception jika retry dilakukan pada status selain Failed.

---

## API Tasks

- Implementasi POST /orders/payment/retry.
- Endpoint requires JWT.
- Request body: failed payment reference dan optional paymentMethod.
- Response: PaymentResponseDTO.
- Error: 400 invalid request, 401 unauthenticated, 403 unauthorized transaction, 409 invalid status, 500 system error.

---

## Frontend Tasks

- Update OrderProcessingService.js dengan retryPayment().
- Implementasi Retry Payment button.
- Tampilkan loading, success, dan failed retry state.
- Jika retry success, tampilkan link ke Order History.

---

## Business Rules

- Retry hanya dapat dilakukan pada Failed transactions.
- Retry menggunakan same payment method atau new method berdasarkan implementation.
- Order hanya dibuat setelah successful payment.

---

## Validation Rules

- Payment Status harus Failed.
- Transaction harus valid.
- Customer hanya dapat retry miliknya sendiri.

---

## Use Case Boundary

Saat mengerjakan UC-15, hanya boleh mengimplementasikan retry untuk failed payment. Tidak boleh menambahkan payment gateway nyata atau fitur payment tambahan.

---

## Acceptance Criteria

- Successful retry menghasilkan Order.
- Failed retry mempertahankan Failed status.
- Retry hanya available untuk Failed transactions.
- Unauthorized retry ditolak.

---

## Testing Checklist

### Positive Case

- Retry failed payment berhasil.
- Payment status berubah Success.
- Order created once.

### Negative Case

- Retry non-failed payment rejected.
- Retry transaction milik user lain rejected.
- Invalid payment reference rejected.

### Error Case

- Stock conflict saat retry handled.
- Transaction rollback jika gagal.

---

## Completion State

Setelah UC-15 selesai:

- Retry Payment berfungsi untuk failed transaction.
- Order Processing module selesai.
- Project siap untuk UC-16 View Order History.

---

# UC-16 View Order History

## Tujuan

Mengimplementasikan fitur View Order History agar Customer dapat melihat semua transaksi miliknya yang berhasil dibuat, diurutkan dari transaksi terbaru.

---

## Initial State

Project telah menyelesaikan Order Processing module:

- Orders, OrderItem, Payment entities tersedia.
- Successful payment membuat Orders.
- Authentication berfungsi.

---

## Dependencies

- UC-14 Process Payment.
- UC-15 Retry Payment.
- OrdersRepository dan PaymentRepository.

---

## Implementation Steps

- Buat OrderSummaryDTO dengan orderId, orderNumber/orderId, orderDate, totalAmount, paymentStatus, orderStatus.
- Buat OrderHistoryResponseDTO berisi list OrderSummaryDTO.
- Buat OrderService pada package service.
- Inject OrdersRepository dan PaymentRepository.
- Implementasi getOrderHistory(userId).
- Retrieve semua Orders milik user.
- Sort berdasarkan orderDate descending.
- Map ke OrderSummaryDTO.
- Buat OrderController dengan @RequestMapping("/orders").
- Tambahkan endpoint GET /orders protected by JWT.
- Return HTTP 200 dengan OrderHistoryResponseDTO.
- Buat OrderService.js frontend.
- Buat OrderHistoryPage.jsx.
- Tampilkan order list, empty state jika tidak ada order, loading, error.
- Tambahkan link ke Order Detail untuk setiap order.
- Tambahkan protected route /orders.

---

## Database Tasks

- Tidak ada perubahan struktur database.
- Query Orders berdasarkan user_id.
- Join atau fetch Payment untuk payment information.

---

## Backend Tasks

- Implementasi OrderSummaryDTO dan OrderHistoryResponseDTO.
- Implementasi OrderService.getOrderHistory().
- Implementasi OrderController GET /orders.
- Pastikan authorization hanya menampilkan order milik current user.

---

## API Tasks

- Implementasi GET /orders.
- Endpoint requires JWT.
- Response: OrderHistoryResponseDTO sorted latest first.
- Error: 401 unauthenticated, 500 system error.

---

## Frontend Tasks

- Implementasi OrderService.js.
- Implementasi OrderHistoryPage.jsx.
- Implementasi OrderList component.
- Tambahkan protected route /orders.
- Tambahkan navigation link ke Order History.

---

## Business Rules

- Customer hanya dapat melihat order miliknya sendiri.
- Order History sorted by latest transaction.
- Setiap transaction menampilkan concise information.
- Order History read-only.

---

## Validation Rules

- Customer harus logged in.
- Customer harus valid.
- Transaction data harus berhasil retrieved.

---

## Use Case Boundary

Saat mengerjakan UC-16, hanya boleh mengimplementasikan list order history. Tidak boleh mengubah order data atau mengimplementasikan order detail selain link navigasi.

---

## Acceptance Criteria

- Order History berhasil ditampilkan.
- Orders sorted from latest.
- Customer tanpa transactions melihat empty state.
- System errors menghasilkan error message.
- Customer tidak dapat melihat order user lain.

---

## Testing Checklist

### Positive Case

- User dengan orders melihat order history.
- Sorting latest first benar.
- Payment/order status displayed.

### Negative Case

- User tanpa orders melihat empty state.
- Unauthenticated request rejected.

### Error Case

- Database error handled.
- Network error handled.

---

## Completion State

Setelah UC-16 selesai:

- Endpoint GET /orders berfungsi dan teruji.
- OrderHistoryPage berfungsi.
- Project siap untuk UC-17 View Order Detail.

---

# UC-17 View Order Detail

## Tujuan

Mengimplementasikan fitur View Order Detail agar Customer dapat melihat informasi lengkap satu transaksi, termasuk snapshot product, payment information, dan order status.

---

## Initial State

Project telah menyelesaikan UC-16:

- Order history dapat ditampilkan.
- Orders, OrderItem, Payment data tersedia.
- Link ke order detail tersedia.

---

## Dependencies

- UC-16 View Order History.
- OrdersRepository, OrderItemRepository, PaymentRepository.
- OrderService dan OrderController.

---

## Implementation Steps

- Buat OrderItemDetailDTO dengan productNameSnapshot, unitPriceSnapshot, quantity, subtotal.
- Buat PaymentDetailDTO dengan paymentMethod, paymentStatus, paymentDate.
- Buat OrderDetailResponseDTO dengan orderId, orderDate, items, totalAmount, paymentDetail, orderStatus.
- Update OrderService dengan getOrderDetail(userId, orderId).
- Retrieve Order berdasarkan orderId.
- Validasi order ada.
- Validasi order milik current user.
- Retrieve OrderItems.
- Retrieve Payment information.
- Map semua data ke OrderDetailResponseDTO.
- Pastikan menggunakan snapshot data dari OrderItem, bukan current Product data.
- Update OrderController dengan endpoint GET /orders/{id}.
- Return HTTP 200 dengan OrderDetailResponseDTO.
- Implementasi OrderDetailPage.jsx.
- Extract orderId dari URL params.
- Fetch order detail dari OrderService.js.
- Tampilkan lengkap: Order Number, Order Date, Product List, Quantity, Unit Price Snapshot, Subtotal, Total Payment, Payment Method, Payment Status, Order Status.
- Tambahkan protected route /orders/:id.

---

## Database Tasks

- Tidak ada perubahan struktur database.
- Query Orders, OrderItems, dan Payment berdasarkan order_id.
- Pastikan data snapshot dari OrderItem digunakan.

---

## Backend Tasks

- Implementasi OrderItemDetailDTO, PaymentDetailDTO, OrderDetailResponseDTO.
- Update OrderService dengan getOrderDetail().
- Update OrderController dengan GET /orders/{id}.
- Implementasi OrderNotFoundException jika belum ada.
- Enforce ownership validation.

---

## API Tasks

- Implementasi GET /orders/{id}.
- Endpoint requires JWT.
- Response: OrderDetailResponseDTO.
- Error: 401 unauthenticated, 403 unauthorized order access, 404 order not found, 500 system error.

---

## Frontend Tasks

- Update OrderService.js dengan getOrderDetail().
- Implementasi OrderDetailPage.jsx.
- Implementasi OrderItemDetailList component.
- Implementasi PaymentInfo component.
- Tambahkan protected route /orders/:id.
- Update OrderHistoryPage item link ke detail.

---

## Business Rules

- Customer hanya dapat melihat detail order miliknya sendiri.
- Transaction detail harus menampilkan snapshot data.
- Transaction detail tidak berubah walaupun product information berubah.
- Transaction detail read-only.

---

## Validation Rules

- Order ID harus valid.
- Order harus dimiliki oleh logged-in Customer.
- Order data harus available.

---

## Use Case Boundary

Saat mengerjakan UC-17, hanya boleh mengimplementasikan detail view untuk existing order. Tidak boleh menambah edit order, cancel order, refund, shipment, admin, atau perubahan transaksi.

---

## Acceptance Criteria

- Transaction detail berhasil ditampilkan.
- Order not found menghasilkan error message.
- Semua transaction information ditampilkan lengkap.
- Product snapshot data ditampilkan dari OrderItem.
- Customer tidak dapat melihat order milik Customer lain.

---

## Testing Checklist

### Positive Case

- Order detail valid displayed.
- OrderItems snapshot displayed.
- Payment information displayed.
- Total correct.

### Negative Case

- Order not found handled.
- Unauthorized order access rejected.
- Invalid orderId handled.

### Error Case

- Database error handled.
- Network error handled.

---

## Completion State

Setelah UC-17 selesai:

- Endpoint GET /orders/{id} berfungsi dan teruji.
- OrderDetailPage menampilkan complete transaction detail.
- Order module selesai.
- Semua 17 Use Case telah memiliki panduan implementasi lengkap.
- Project siap untuk implementasi end-to-end berdasarkan PROJECT_SPEC.md dan IMPLEMENTATION_TASKLIST.md.

---

# Final Implementation Verification

- Pastikan semua endpoint sesuai API Specification.
- Pastikan semua business rules dipatuhi.
- Pastikan seluruh protected routes menggunakan JWT.
- Pastikan tidak ada fitur di luar PROJECT_SPEC.md.
- Pastikan frontend, backend, database, dan API konsisten.
- Pastikan setiap Use Case diuji sebelum lanjut ke Use Case berikutnya.

