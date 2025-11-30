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
npm run mock
```
Server runs on http://localhost:3000

### Generate Authentication Token
```sh
npm run token
```
Copy the generated JWT token for authenticated requests.

### Build & Lint
```sh
npm run build        # Compile TypeScript
npm run lint         # Check code quality
npm run type-check   # Validate types
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

## Testing Authentication

1. Generate a token:
   ```sh
   npm run token
   ```

2. Copy the JWT token from the output

3. Use it in the Authorization header:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Architecture

- **TypeScript**: Full type safety with strict mode
- **Adapters**: Pluggable interfaces for auth and database
- **Mock Data**: In-memory storage for development
- **ESLint**: Code quality and consistency
- **Express**: HTTP server framework

## Scripts

- `npm run mock` - Start development server
- `npm run token` - Generate JWT token
- `npm run build` - Compile TypeScript
- `npm run lint` - Run linter
- `npm run type-check` - Validate types
- `npm start` - Run from TypeScript source
- `npm run start:prod` - Run compiled JavaScript