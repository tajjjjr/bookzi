# Bookzi Backend

TypeScript-based backend API with mock adapters for testing and development.

## Prerequisites

- Node.js (v18 or later)
- npm

## Installation

```sh
cd backend
npm install
```

## Development

### Start Development Server
```sh
npm run start
```
Server runs on http://localhost:3000

### Build & Lint
```sh
npm run build        # Compile TypeScript
npm run lint         # Check code quality
npm run type-check   # Validate types
```

## Seed SQLite Database

In order to test the product and order pages, you need to seed the database first. This command will create some data you can use to test the application.

```bash
npm run seed:sqlite  # Seed SQLite database with sample data
```

## Authentication

### Register New User
```sh
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"mypassword"}'
```

### Login Existing User
```sh
curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"alice@example.com","password":"password123"}'
```

### Generate Test Token (CLI)
```sh
npm run jwt "1"
```

### Using Authentication Token

Both login and register return a JWT token:
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

Use the token in protected requests:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## API Endpoints

All routes are prefixed with `/api`.

### Public Routes

#### Get Products
```sh
curl http://localhost:3000/api/products
```

#### Health Check
```sh
curl http://localhost:3000/health
```

### Protected Routes (Require Authentication)

#### Get Orders
```sh
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3000/api/orders
```

#### Create Order
```sh
curl -X POST \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"items":[{"productId":1,"quantity":2}]}' \
     http://localhost:3000/api/orders
```

## Example HTML CRUD For Products

1. Start the server:
```bash
npm run start
```

2. Navigate to the web interface:
```
http://localhost:3000/
```

3. **Login/Register**: Create an account or login with existing credentials

4. **Product Management**: Full CRUD operations with image upload support
   - Create products with multiple images
   - View all products with images
   - Edit existing products
   - Delete products

### Supported Product API Routes

#### Basic CRUD
- `GET /api/products` - List products with filters/pagination
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (without images)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Image Management
- `POST /api/products/create-with-images` - Create product + upload images
- `POST /api/products/:productId/images` - Add image to existing product
- `DELETE /api/products/:productId/images/:attachmentId` - Remove product image
- `PUT /api/products/:productId/images/:attachmentId/default` - Set default image

#### File Operations
- `POST /api/attachments/upload` - Upload standalone file
- `GET /api/attachments/:id` - Get attachment metadata
- `GET /api/attachments/entity/:entityType/:entityId` - Get files for entity
- `DELETE /api/attachments/:id` - Delete attachment

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Adapters

The backend uses a pluggable adapter architecture for different data sources:

### Mock Adapter (In-Memory)
```sh
npm run mock
```
Uses in-memory data for quick testing and development.

### SQLite Adapter (Local Database)
```sh
# Seed the database
npm run seed:sqlite

# Start SQLite server
npm run sqlite
```

The SQLite adapter provides:
- **Persistent storage** with local SQLite file (`dev.sqlite`)
- **Auto-schema creation** for users, products, and orders
- **Seeded data** with sample users (hashed passwords), products, and orders
- **Same API endpoints** as mock adapter

### Turso Adapter (Cloud Database)
```sh
# Set environment variables (copy .env.example to .env)
TURSO_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-token

# Run migration on Turso database
# Execute migrations/001_init_tables.sql

# Start Turso server
npm run turso
```

The Turso adapter provides:
- **Cloud-hosted SQLite** with Turso
- **Same interface** as SQLite adapter
- **Production-ready** with remote persistence
- **Environment-based configuration**

#### Database Schema (SQLite & Turso)
- **Users**: `id`, `name`, `email`, `password` (bcrypt hashed)
- **Products**: `id`, `name`, `price`, `stock`
- **Orders**: `id`, `user_id`, `items_json`, `created_at`

## Architecture

- **TypeScript**: Full type safety with strict mode
- **Adapters**: Pluggable interfaces for auth and database
- **Mock Data**: In-memory storage for development
- **SQLite**: Local database with persistent storage
- **ESLint**: Code quality and consistency
- **Express**: HTTP server framework

## Scripts

- `npm run mock` - Start development server (in-memory data)
- `npm run sqlite` - Start SQLite development server
- `npm run turso` - Start Turso cloud database server
- `npm run seed:sqlite` - Populate SQLite database with sample data
- `npm run token` - Generate JWT token
- `npm run build` - Compile TypeScript
- `npm run lint` - Run linter
- `npm run type-check` - Validate types
- `npm start` - Run from TypeScript source
- `npm run start:prod` - Run compiled JavaScript