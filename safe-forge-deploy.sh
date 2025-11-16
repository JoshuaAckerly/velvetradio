#!/bin/bash
# Safe Laravel Forge Deployment Script for velvetradio.com
# This script skips migrations if tables already exist

set -e

SSR_PORT=13716
PROJECT_NAME="velvetradio"

echo "🚀 Starting safe deployment for $PROJECT_NAME with SSR on port $SSR_PORT"

cd /home/forge/velvetradio.com

# Stop existing SSR process
echo "🛑 Stopping existing SSR process..."
lsof -ti:$SSR_PORT | xargs kill -TERM 2>/dev/null || true
sleep 2
lsof -ti:$SSR_PORT | xargs kill -9 2>/dev/null || true

# Update Git repository
echo "📦 Pulling latest code..."
git pull origin $FORGE_SITE_BRANCH

# Update PHP dependencies
echo "🐘 Installing PHP dependencies..."
$FORGE_COMPOSER install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Update Node dependencies and build
echo "📦 Installing Node dependencies..."
npm ci

# Build frontend assets with SSR
echo "🎨 Building frontend assets and SSR bundle..."
npm run build

# Update environment configuration
if ! grep -q "INERTIA_SSR_PORT=$SSR_PORT" .env; then
    echo "⚙️ Adding SSR port to .env..."
    echo "INERTIA_SSR_PORT=$SSR_PORT" >> .env
fi

if ! grep -q "INERTIA_SSR_ENABLED=true" .env; then
    echo "⚙️ Enabling SSR in .env..."
    echo "INERTIA_SSR_ENABLED=true" >> .env
fi

# Laravel optimizations (skip migrations - database already set up)
echo "🔧 Optimizing Laravel..."
if [ -f artisan ]; then
    # Clear caches first
    php artisan cache:clear || true
    php artisan config:clear || true
    php artisan route:clear || true
    php artisan view:clear || true
    
    # Cache optimizations
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

# Create SSR log directory
mkdir -p storage/logs

# Start SSR process
echo "🚀 Starting SSR process on port $SSR_PORT..."
nohup node bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &
SSR_PID=$!

# Wait and verify SSR is running
sleep 3
if kill -0 $SSR_PID 2>/dev/null; then
    echo "✅ SSR started successfully (PID: $SSR_PID)"
    if curl -s "http://127.0.0.1:$SSR_PORT" > /dev/null; then
        echo "✅ SSR endpoint responding"
    else
        echo "⚠️ SSR endpoint not responding, check logs"
    fi
else
    echo "❌ Failed to start SSR process"
    exit 1
fi

# Reload PHP-FPM
if [[ -f /home/forge/.forge/forge-php-version ]]; then
    PHP_VERSION=$(cat /home/forge/.forge/forge-php-version)
    sudo -S service php${PHP_VERSION}-fpm reload
fi

echo "🎉 Deployment completed successfully!"
echo "📌 Note: Migrations were skipped as database is already set up"
