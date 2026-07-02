# E-Commerce Frontend

## Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

Update `.env` with your backend API URL (default: `http://localhost:8080/api`)

## Development

Run development server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173`

## Build

Build untuk production:
```bash
npm run build
```

## Type Check

Check TypeScript errors:
```bash
npm run typecheck
```

## Project Structure

```
src/
├── pages/           # Halaman aplikasi
├── components/      # Komponen reusable
├── hooks/           # Custom React hooks
├── services/        # API calls menggunakan Axios
├── layouts/         # Layout halaman
├── routes/          # Routing configuration
├── contexts/        # Global state (Context API)
├── utils/           # Helper functions
└── assets/          # Gambar dan aset statis
```

## Technologies

- React 19
- React Router 7
- Axios 1.18
- Vite 8
- TypeScript 6
