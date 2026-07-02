# E-Commerce Project

E-commerce platform dengan React frontend, Spring Boot backend, dan MySQL database.

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend API: `http://localhost:8080`
Swagger Docs: `http://localhost:8080/swagger-ui.html`

## Project Documentation

- [Gambaran Project](./docs/gambaran_project.md) - Deskripsi lengkap project, fitur, dan stack
- [Frontend README](./frontend/README.md) - Setup dan cara menjalankan frontend
- [Backend README](./backend/README.md) - Setup dan cara menjalankan backend

## Stack Teknologi

### Frontend
- React 19
- React Router 7
- Axios
- Vite
- TypeScript

### Backend
- Spring Boot 3.2.5
- Spring Security (JWT)
- Spring Data JPA
- MySQL
- Maven

### Database
- MySQL

## Project Structure

```
E-COMMERCE/
├── docs/
│   └── gambaran_project.md
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
├── backend/
│   ├── src/main/java/com/ecommerce/
│   ├── src/main/resources/
│   ├── pom.xml
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
└── README.md
```

## Development Workflow

1. Clone repository
2. Setup frontend: `cd frontend && npm install`
3. Setup backend: `cd backend && mvn clean install`
4. Update configuration (database, JWT secret)
5. Run frontend: `npm run dev`
6. Run backend: `mvn spring-boot:run`

## Features

- Customer Registration & Login (JWT)
- Product Catalog (Browse, Search, Filter)
- Shopping Cart
- Checkout & Mock Payment Gateway
- Order Management
- Flash Sale
- Toast Notifications
- Order History
