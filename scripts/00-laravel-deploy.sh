#!/usr/bin/env bash
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Clearing old Cache, routes"
php artisan config:clear
php artisan cache:clear
php artisan config:cache
php artisan view:clear

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."

echo "Running npm..."
npm install

echo "Running npm run build..."
npm run build
