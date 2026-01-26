#!/bin/bash

# Interrompi se c'è un errore
set -e

echo "🚀 Install deps..."

# 1. Frontend (Angular)
echo "--------------------------------------"
echo "📦 deps install for Frontend (iam-ui)..."
cd iam-ui
npm install
cd ..

# 2. Backend (Python)
echo "--------------------------------------"
echo "🐍 deps install for Backend (proxy-application)..."
cd proxy-application

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt
cd ..

echo "--------------------------------------"
echo "✅ Installation done!"
