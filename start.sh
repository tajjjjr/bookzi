#!/bin/bash

# Kill any existing processes on ports 3000 and 5173
echo "Stopping existing servers..."
if command -v fuser >/dev/null 2>&1; then
    fuser -k 3000/tcp 5173/tcp 2>/dev/null || true
else
    # WSL/Windows fallback
    pkill -f "node.*3000" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
fi
sleep 2

echo "Starting Bookzi application..."

# Start backend on port 3000
echo "Starting backend server..."
cd backend
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

echo ""
echo "✅ Servers started successfully!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:3000"
echo "📚 API Docs: http://localhost:3000/api-docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Cleanup function
cleanup() {
    echo "\nStopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    if command -v fuser >/dev/null 2>&1; then
        fuser -k 3000/tcp 5173/tcp 2>/dev/null || true
    else
        pkill -f "node.*3000" 2>/dev/null || true
        pkill -f "vite" 2>/dev/null || true
    fi
    echo "Servers stopped."
    exit 0
}

trap cleanup INT
wait