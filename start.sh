#!/bin/bash

echo "🚀 App Start..."

cleanup() {
    echo "🛑 Exiting..."
    kill $(jobs -p)
    exit
}
trap cleanup SIGINT SIGTERM

echo "Starting Backend..."
cd proxy-application
source venv/bin/activate
python -m main &
BACKEND_PID=$!
cd ..

echo "Starting Frontend..."
cd iam-ui
npm start & 
FRONTEND_PID=$!
cd ..

echo "✅ Frontend e Backend ready to go."
echo "   Backend PID: $BACKEND_PID"
echo "   Frontend PID: $FRONTEND_PID"
echo "press CTRL+C to end."

wait
