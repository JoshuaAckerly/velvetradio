# Velvet Radio

A Laravel-based web radio application.

## Setup

1. Install dependencies:
   ```bash
   composer install
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. Run the application:
   ```bash
   php artisan serve
   npm run dev
   ```

## Features

- Web radio streaming
- Custom CSS with Tailwind integration
- Dark mode support