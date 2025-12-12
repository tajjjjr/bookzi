# Bookzi Backend

Modern e-commerce API with authentication, product management, order processing, and file uploads. Built with TypeScript, Drizzle ORM, and a clean MVC architecture.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run database migrations
npm run migrate

# Start the server
npm start
```

**API Documentation:** http://localhost:3000/api-docs

## Architecture

**Clean MVC + Repository Pattern:**
- **Database Layer**: Drizzle ORM with SQLite (dev) / Turso (prod)
- **Repository Layer**: Type-safe data access
- **Service Layer**: Business logic
- **Controller Layer**: HTTP request handling
- **Route Layer**: API endpoint definitions

## Core Features

- **Authentication**: JWT-based user registration and login
- **Product Management**: Full CRUD with image uploads, categories, and reviews
- **Order Management**: Secure order processing with user isolation
- **File Uploads**: Image management with local storage
- **CORS**: Configured for frontend integration (localhost:5173)
- **Swagger Documentation**: Interactive API documentation

## API Documentation

All API routes are prefixed with `/api` and protected routes require JWT authentication.

### Authentication

#### Register User
```sh
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "mypassword"
  }'
```

#### Login User
```sh
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

### Products

#### List Products
```sh
curl http://localhost:3000/api/products
```

#### Get Single Product
```sh
curl http://localhost:3000/api/products/PRODUCT_ID
```

#### Create Product (JSON)
```sh
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Sample Book",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "price": 1999,
    "currency": "USD",
    "sku": "BOOK001",
    "stock": 10,
    "category": "Course",
    "slug": "sample-book",
    "isActive": true
  }'
```

#### Create Product with Images (Multipart)
```sh
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F 'product={"name":"Book with Images","title":"Advanced React","author":"John Doe","price":2499,"currency":"USD","sku":"BOOK002","stock":5,"category":"Course","slug":"book-with-images","isActive":true}' \
  -F 'images=@image1.jpg' \
  -F 'images=@image2.jpg'
```

#### Update Product
```sh
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Updated Book Name",
    "price": 2499,
    "stock": 15
  }'
```

#### Delete Product
```sh
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Orders (Protected Routes)

#### List User Orders
```sh
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:3000/api/orders?page=1&limit=10"
```

#### Get Single Order
```sh
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/orders/ORDER_ID
```

#### Create Order
```sh
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "userId": "user-123",
    "items": [{
      "productId": "prod-1",
      "productName": "Sample Book",
      "sku": "BOOK001",
      "quantity": 2,
      "price": 1999,
      "subtotal": 3998,
      "tax": 320,
      "total": 4318,
      "isFulfilled": false,
      "isRefunded": false
    }],
    "subtotal": 3998,
    "tax": 320,
    "shippingCost": 0,
    "total": 4318,
    "currency": "USD",
    "customerEmail": "customer@example.com",
    "customerPhone": "+1234567890",
    "notes": "Please handle with care"
  }'
```

#### Update Order Status
```sh
curl -X PATCH http://localhost:3000/api/orders/ORDER_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"status": "shipped"}'
```

#### Cancel Order
```sh
curl -X POST http://localhost:3000/api/orders/ORDER_ID/cancel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"reason": "Customer requested cancellation"}'
```

### File Management

#### Upload File
```sh
curl -X POST http://localhost:3000/api/attachments/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F 'file=@image.jpg'
```

#### Add Image to Product
```sh
curl -X POST http://localhost:3000/api/products/PRODUCT_ID/images \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F 'image=@product-image.jpg'
```

#### Remove Product Image
```sh
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID/images/ATTACHMENT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Set Default Product Image
```sh
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID/images/ATTACHMENT_ID/default \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Get Files for Entity
```sh
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/attachments/entity/product/PRODUCT_ID
```

### Public Routes

#### Health Check
```sh
curl http://localhost:3000/health
```

## Database

**Development**: SQLite (local file)
**Production**: Turso (cloud SQLite)

```bash
# Generate and run migrations
npm run migrate

# For production, set in .env:
# DATABASE_URL=libsql://your-database.turso.io
# DATABASE_AUTH_TOKEN=your-turso-token
```

## Database Schema

### Users Table
- `id` (TEXT PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `email` (TEXT UNIQUE NOT NULL)
- `password` (TEXT NOT NULL) - bcrypt hashed
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

### Products Table
- `id` (TEXT PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `description` (TEXT)
- `price` (INTEGER NOT NULL) - in cents
- `currency` (TEXT DEFAULT 'USD')
- `sku` (TEXT UNIQUE NOT NULL)
- `stock` (INTEGER DEFAULT 0)
- `slug` (TEXT UNIQUE NOT NULL)
- `is_active` (BOOLEAN DEFAULT 1)
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

### Orders Table
- `id` (TEXT PRIMARY KEY)
- `order_number` (TEXT UNIQUE NOT NULL)
- `user_id` (TEXT NOT NULL)
- `items` (TEXT NOT NULL) - JSON array
- `subtotal` (INTEGER NOT NULL)
- `tax` (INTEGER DEFAULT 0)
- `shipping_cost` (INTEGER DEFAULT 0)
- `total` (INTEGER NOT NULL)
- `currency` (TEXT DEFAULT 'USD')
- `status` (TEXT DEFAULT 'pending')
- `customer_email` (TEXT NOT NULL)
- `customer_phone` (TEXT)
- `notes` (TEXT)
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

### Attachments Table
- `id` (TEXT PRIMARY KEY)
- `filename` (TEXT NOT NULL)
- `original_name` (TEXT NOT NULL)
- `mime_type` (TEXT NOT NULL)
- `size` (INTEGER NOT NULL)
- `url` (TEXT NOT NULL)
- `path` (TEXT NOT NULL)
- `entity_type` (TEXT)
- `entity_id` (TEXT)
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **User Isolation**: Orders are automatically attached to authenticated user
- **Input Validation**: Zod schema validation for all inputs
- **Password Hashing**: bcrypt for secure password storage
- **File Upload Security**: Type and size validation for uploads

## Available Scripts

```bash
npm start          # Start development server
npm run build      # Compile TypeScript
npm run lint       # Code quality check
npm run migrate    # Run database migrations
npm run start:prod # Start production server
npm run clean      # Clean dist folder
```

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: Drizzle ORM + SQLite/Turso
- **Auth**: JWT + bcrypt
- **File Upload**: Multer
- **Documentation**: Swagger/OpenAPI 3.0
- **CORS**: Enabled for cross-origin requests

## Environment Variables

```bash
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key
DATABASE_URL=file:./dev.sqlite
# DATABASE_AUTH_TOKEN=turso-token  # For production
```

## Product Schema

Supports enhanced product structure:
```typescript
Product {
  id: string;
  title: string;
  author: string;
  price: number;
  category: "Case Study" | "Course" | "Guide";
  description: string;
  image: string;
  rating: number;
  reviews: number;
  reviewsList?: Review[];
}
```

## Development

**From project root:**
```bash
npm run dev        # Start both frontend and backend
npm run dev:backend # Backend only
npm run dev:frontend # Frontend only
```

**CORS Configuration:**
- Allows requests from localhost:5173 (frontend)
- Supports credentials for authentication

**API Endpoints:**
- Base URL: http://localhost:3000/api
- Documentation: http://localhost:3000/api-docs
- Health Check: http://localhost:3000/healths
