#!/bin/bash
# ==============================================================================
# Elleyhill Power Zambia - Hostinger VPS Deployment Script
# ==============================================================================
set -e

echo "🚀 Starting Elleyhill Power Next.js Deployment..."

# Navigate to project directory (adjust if your path differs)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "📥 Pulling latest updates from git..."
git pull origin main

echo "📦 Installing production dependencies..."
npm ci --legacy-peer-deps

echo "🛠️ Building Next.js application..."
npm run build

echo "🔄 Reloading PM2 cluster with zero-downtime..."
if pm2 list | grep -q "elleyhill-site"; then
    pm2 reload ecosystem.config.js --update-env
else
    pm2 start ecosystem.config.js
fi

pm2 save

echo "✅ Deployment successful! Elleyhill Power Zambia is running."
