# Bookzi Backend

Complete e-commerce backend with authentication, product management, order processing, and file uploads.

## Prerequisites

- Node.js (v18 or later)
- npm

## Installation

```sh
cd backend
npm install
```

## Quick Start

1. **Start the server:**
```sh
npm run start
```

2. **Seed database with sample data:**
```sh
npm run seed:sqlite
```

3. **Access web interface:**
```
http://localhost:3000/
```

4. **Login with sample user:**
   - Email: `alice@example.com`
   - Password: `password123`

## Features

- **Authentication**: JWT-based user registration and login
- **Product Management**: Full CRUD with image uploads and inventory tracking
- **Order Management**: Secure order processing with user isolation
- **File Uploads**: Image management with local storage
- **Web Interface**: Complete admin panel for all operations

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

#### Create Product
```sh
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Sample Book",
    "description": "A great book",
    "price": 1999,
    "currency": "USD",
    "sku": "BOOK001",
    "stock": 10,
    "slug": "sample-book",
    "trackInventory": true,
    "allowBackorder": false,
    "hasVariants": false,
    "isActive": true
  }'
```

#### Create Product with Images
```sh
curl -X POST http://localhost:3000/api/products/create-with-images \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F 'product={"name":"Book with Images","price":2499,"currency":"USD","sku":"BOOK002","stock":5,"slug":"book-with-images","trackInventory":true,"allowBackorder":false,"hasVariants":false,"isActive":true}' \
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

#### Access Web Interface
```
http://localhost:3000/
```

## Web Interface Features

The web interface at `http://localhost:3000/` provides:

1. **User Authentication**
   - Login/Register forms
   - JWT token management
   - Session persistence

2. **Product Management**
   - Create products with multiple images
   - Edit existing products
   - Delete products
   - View product catalog

3. **Shopping & Orders**
   - Add products to cart
   - Checkout process
   - View order history
   - Order status tracking

## Database Adapters

### SQLite (Default)
```sh
npm run start          # Uses SQLite by default
npm run seed:sqlite    # Populate with sample data
```

### Mock (In-Memory)
```sh
npm run mock
```

### Turso (Cloud)
```sh
# Set environment variables in .env
TURSO_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-token

npm run turso
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

## Development Scripts

```sh
npm run start         # Start development server
npm run build         # Compile TypeScript
npm run lint          # Check code quality
npm run type-check    # Validate TypeScript types
npm run seed:sqlite   # Populate database with sample data
npm run token         # Generate test JWT token
```

## Architecture

- **TypeScript**: Full type safety with strict mode
- **Adapter Pattern**: Pluggable interfaces for different data sources
- **Express**: HTTP server with middleware support
- **JWT**: Stateless authentication
- **Zod**: Runtime type validation
- **Multer**: File upload handling
- **ESLint**: Code quality enforcement

## Sample Data

After running `npm run seed:sqlite`, you can use these test accounts:

- **Alice**: `alice@example.com` / `password123`
- **Bob**: `bob@example.com` / `password456`
- **Charlie**: `charlie@example.com` / `password789`

The database will also contain sample products and orders for testing.