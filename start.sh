#!/bin/bash

# Kill any existing processes on ports 3000 and 5173
echo "Stopping existing servers..."
fuser -k 3000/tcp 5173/tcp 2>/dev/null || true
sleep 2

echo "Starting Bookzi application setup..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Check if .env exists, create from example if not
if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
fi

# Run database migrations
echo "Running database migrations..."
npm run migrate 2>/dev/null || echo "Migrations completed or not needed"

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Start backend on port 3000
echo "Starting backend server..."
cd ../backend
npm start &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to initialize..."
sleep 5

# Start frontend on port 5173
echo "Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait a bit more for frontend to start
sleep 3

echo ""
echo "=== Bookzi Application Started ==="
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:3000"
echo "API Docs: http://localhost:3000/api-docs"
echo "Health Check: http://localhost:3000/health"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "Logs will appear below..."
echo ""

# Cleanup function
cleanup() {
    echo "\n=== Stopping Bookzi Application ==="
    echo "Terminating backend (PID: $BACKEND_PID)..."
    echo "Terminating frontend (PID: $FRONTEND_PID)..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    sleep 2
    fuser -k 3000/tcp 5173/tcp 2>/dev/null || true
    echo "All servers stopped."
    exit 0
}

# Handle interrupts
trap cleanup INT TERM

# Wait for processes
wait