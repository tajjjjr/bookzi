# Bookzi API Testing Guide

## Quick Start

```bash
./start.sh  # Runs both frontend (3000) and backend (3001)
```

## Admin User

- **Email**: <admin@bookzi.com>
- **Password**: admin123
- **JWT Token**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiZW1haWwiOiJhZG1pbkJib29remkuY29tIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE3NjQ1MTM3OTgsImV4cCI6MTc2NTExODU5OH0.voyzGQHRRrwlAljNdB0syZje15Wh9xd9AMLG9XrlSvg`

## API Endpoints

### Public Endpoints

```bash
# Health Check
curl http://localhost:3001/health

# Get Products
curl http://localhost:3001/api/products

# Register User
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login User
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bookzi.com","password":"admin123"}'
```

### Protected Endpoints (Require Authorization Header)

```bash
# Get Orders
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3001/api/orders

# Create Order (use string productId)
curl -X POST \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"1","quantity":2}]}' \
  http://localhost:3001/api/orders
```

## Test Results

- ✅ Health Check: Working
- ✅ Products: 3 products (Laptop, Keyboard, Mouse)
- ✅ Authentication: Admin user created
- ✅ Protected Routes: Orders endpoint accessible
- ⚠️ Order Creation: Requires string productId format

## URLs

- **Frontend**: <http://localhost:3000>
- **Backend API**: <http://localhost:3001>
- **Backend Web UI**: <http://localhost:3001/>
