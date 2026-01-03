# E-Commerce Admin Dashboard

A full-stack admin dashboard for managing e-commerce operations with real-time inventory tracking, order management, and analytics.

## Tech Stack

**Frontend:**
- React 19
- Redux Toolkit + RTK Query
- Tailwind CSS
- Recharts
- Vite

**Backend:**
- Node.js + Express
- PostgreSQL (Neon Cloud)

## Features

- Real-time product inventory management
- Order tracking and status updates
- Dashboard with sales analytics and charts
- Low stock alerts
- Category breakdown
- Mobile responsive design
- Optimistic UI updates

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (local or cloud)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce-admin
```

### 2. Install frontend dependencies
```bash
cd ecommerce-admin
npm install
```

### 3. Install backend dependencies
```bash
cd ../backend
npm install
```

### 4. Set up environment variables

**Backend (.env):**
```
DATABASE_URL=your_neon_database_url
# OR for local PostgreSQL:
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ecommerce
DB_PASSWORD=your_password
DB_PORT=5432

PORT=5000
NODE_ENV=development
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

### 5. Set up the database
```bash
cd backend
psql -U postgres -d ecommerce -f schema.sql
```

## Running the Application

### Start the backend server
```bash
cd backend
npm start
```

### Start the frontend dev server
```bash
cd ecommerce-admin
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Project Structure

```
ecommerce-admin/
├── ecommerce-admin/        # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── features/       # RTK Query API slice
│   │   ├── app/            # Redux store
│   │   └── utils/          # Helper functions
│   └── package.json
├── backend/                # Express API server
│   ├── server.js           # API routes
│   ├── db.js               # Database connection
│   ├── schema.sql          # Database schema
│   └── package.json
└── notes/                  # Documentation
```

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `PATCH /api/products/:id/restock` - Restock product
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id` - Update order status
- `GET /api/stats` - Get dashboard statistics

## Deployment

**Frontend (Vercel):**
```bash
npm run build
# Deploy dist/ folder to Vercel
```

**Backend (Render):**
- Push backend folder to GitHub
- Connect to Render
- Add environment variables
- Deploy

## License

MIT
