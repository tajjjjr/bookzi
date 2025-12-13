#!/bin/bash

# Kill any existing processes on ports 3000 and 3001
echo "Stopping existing servers..."
fuser -k 3000/tcp 3001/tcp 2>/dev/null || true
sleep 2

echo "Starting Bookzi application..."

# Start backend on port 3001
echo "Starting backend server..."
cd backend
PORT=3001 npm start &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to initialize..."
sleep 5

# Start frontend on port 3000
echo "Starting frontend server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Servers started successfully!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "📚 API Docs: http://localhost:3001/api-docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Cleanup function
cleanup() {
    echo "\nStopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    fuser -k 3000/tcp 3001/tcp 2>/dev/null || true
    echo "Servers stopped."
    exit 0
}

trap cleanup INT
wait