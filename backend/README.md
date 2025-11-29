# Backend Mock Server

This document explains how to run and test the backend using the provided mock server. The mock server uses in-memory data adapters for the database and authentication, allowing for quick testing of the API endpoints without needing a real database or auth service.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (included with Node.js)

## Installation

1.  Navigate to the backend directory:
    ```sh
    cd backend
    ```

2.  Install the required dependencies:
    ```sh
    npm install
    ```

## Running the Server

To start the mock server, run the following command from within the `backend` directory:

```sh
npm run mock.js
```

You should see a confirmation message in the console:
```
Backend test server running on http://localhost:3000
```

## Available Endpoints

Once the server is running, you can use tools like `curl`, Postman, or your web browser to interact with the following endpoints.

### Health Check

- **Endpoint**: `GET /health`
- **Description**: A simple endpoint to verify that the server is running.
- **Example Request**:
  ```sh
  curl http://localhost:3000/health
  ```

### API Endpoints

All API routes are prefixed with `/api`.

#### Get All Products

- **Endpoint**: `GET /api/products`
- **Description**: Retrieves a list of all mock products.
- **Example Request**:
  ```sh
  curl http://localhost:3000/api/products
  ```

#### Get Orders for a User

- **Endpoint**: `GET /api/orders`
- **Description**: Retrieves a list of mock orders for the hardcoded mock user (userId: 1).
- **Example Request**:
  ```sh
  curl http://localhost:3000/api/orders
  ```