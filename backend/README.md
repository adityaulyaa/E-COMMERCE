# E-Commerce Backend

## Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Download dependencies:
```bash
mvn clean install
```

3. Create `.env` file (optional, configuration juga ada di `application.properties`):
```bash
cp .env.example .env
```

Update `src/main/resources/application.properties` dengan database dan JWT configuration Anda:
- Database URL
- Database username dan password
- JWT secret key

## Development

Run application:
```bash
mvn spring-boot:run
```

Server akan berjalan di `http://localhost:8080`

## Build

Build JAR file:
```bash
mvn clean package
```

JAR file akan tersedia di `target/backend-0.0.1-SNAPSHOT.jar`

## Database

Aplikasi menggunakan MySQL. Pastikan MySQL running dan update configuration di `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=your_password
```

JPA akan otomatis membuat tabel berdasarkan entity (ddl-auto=update).

## Swagger/OpenAPI Documentation

Setelah aplikasi running, akses dokumentasi API di:
```
http://localhost:8080/swagger-ui.html
```

## Project Structure

```
src/main/java/com/ecommerce/
├── config/          # Configuration
├── controller/      # REST Controllers
├── service/         # Business Logic
├── repository/      # Database Access
├── entity/          # JPA Entities
├── dto/             # Request/Response Objects
├── mapper/          # Entity-DTO Mapping
├── security/        # JWT dan Security
├── exception/       # Custom Exceptions
└── util/            # Utility Functions
```

## Technologies

- Spring Boot 3.2.5
- Spring Security + JWT
- Spring Data JPA
- Hibernate
- MySQL Connector
- MapStruct
- Lombok
- Swagger/OpenAPI
- Maven
