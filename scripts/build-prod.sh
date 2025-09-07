#!/bin/bash

# Production build script for Thermapex

set -e

echo "🚀 Starting production build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy --skip-seed || true

# Build Next.js application
echo "🏗️ Building Next.js application..."
NODE_ENV=production npm run build

# Verify build
echo "✅ Verifying build..."
if [ -d ".next/standalone" ]; then
    echo "✅ Standalone build created successfully"
else
    echo "❌ Standalone build failed"
    exit 1
fi

echo "🎉 Production build completed successfully!"
echo ""
echo "To start the production server, run:"
echo "  NODE_ENV=production node server.js"
echo ""
echo "Or with PM2:"
echo "  pm2 start server.js --name thermapex"