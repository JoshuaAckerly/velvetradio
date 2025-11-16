# Velvet Radio

🎙️ A modern Laravel-based web radio application featuring server-side rendering with Inertia.js and React.

## 🚀 Tech Stack

- **Backend:** Laravel 11.x with PHP 8.2+
- **Frontend:** React 18 with TypeScript
- **SPA Framework:** Inertia.js
- **Styling:** Tailwind CSS
- **Build Tool:** Vite with SSR support
- **Testing:** PHPUnit
- **Deployment:** Laravel Forge ready

## 📋 Features

- **Radio Models:** Shows, Hosts, and Episodes with full relationships
- **Server-Side Rendering:** Fast initial page loads with SSR (port 13716)
- **Responsive Design:** Mobile-first design with Tailwind CSS
- **SEO Optimized:** Sitemap generation and robots.txt configuration
- **Type Safety:** Full TypeScript support on frontend
- **Testing Suite:** Comprehensive PHPUnit tests for backend
- **Production Ready:** Database migrations with existence checks

## 🛠️ Setup

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL/PostgreSQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JoshuaAckerly/velvetradio.git
   cd velvetradio
   ```

2. **Install dependencies:**
   ```bash
   composer install
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   
   Update `.env` with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=velvetradio
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. **Run migrations and seeders:**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

5. **Build assets:**
   ```bash
   npm run build
   ```

### Development

**Option 1: Use the development script (Windows):**
```bash
dev.bat
```

**Option 2: Run services manually:**
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server with SSR
npm run dev
```

Visit `http://localhost:8000`

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit
```

## 📦 Database Structure

### Models

- **Show:** Radio shows with title, description, and schedule
- **Host:** Show hosts with bio and profile information
- **Episode:** Individual episodes linked to shows

### Relationships

- Shows have many Episodes
- Shows belong to many Hosts
- Episodes belong to a Show

## 🚢 Deployment

### Laravel Forge

Use the included deployment script:

```bash
./deploy-forge.sh
```

The script handles:
- Dependency installation
- Database migrations with safety checks
- Asset compilation
- Cache clearing
- SSR process management

### Manual Deployment

```bash
git pull origin main
composer install --optimize-autoloader --no-dev
npm ci
npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 📁 Project Structure

```
app/
├── Models/
│   ├── Show.php
│   ├── Host.php
│   └── Episode.php
resources/
├── js/
│   ├── components/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── layouts/
│   │   └── main.tsx
│   └── pages/
│       ├── welcome.tsx
│       ├── shows.tsx
│       ├── hosts.tsx
│       └── episodes.tsx
database/
├── migrations/
└── seeders/
```

## 🔧 Configuration

### SSR Port

The application uses port **13716** for server-side rendering. Configure in `vite.config.ts`:

```typescript
ssr: {
  noExternal: ['@inertiajs/react'],
},
```

### Sitemap

Configure the sitemap base URL in `config/sitemap.php` or via environment variable:

```env
SITEMAP_BASE_URL=https://velvetradio.graveyardjokes.com
```

## 📝 License

This project is part of the Graveyard Jokes Studios Inc. portfolio.

## 🤝 Contributing

This is a private project. For inquiries, contact Joshua Ackerly.

## 🔗 Related Projects

- [Graveyard Jokes](../graveyardjokes)
- [Hollow Press](../hollowpress)
- [Lunar Blood](../lunarblood)

---

**Developed by:** Joshua Ackerly  
**Organization:** Graveyard Jokes Studios Inc.