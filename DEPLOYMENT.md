# Deployment Documentation - velvetradio

This document provides comprehensive deployment instructions for the Velvet Radio Laravel application, which uses server-side rendering with Inertia.js and React.

## 🚀 Deployment Overview

Velvet Radio is deployed using Hypervisor custom deployment scripts to:
- **Production:** AWS EC2 instances with PM2 process management
- **Test Server:** Ubuntu VM for staging and testing

## 📋 Prerequisites

- AWS EC2 instance (production) or Ubuntu VM (test)
- PHP 8.3+ with required extensions
- Node.js 18+
- MySQL/PostgreSQL database
- PM2 process manager
- Nginx web server

## 🏗️ Production Deployment (AWS EC2)

### Automated Deployment

1. **SSH into your production server**
2. **Navigate to the project directory:**
   ```bash
   cd /var/www/velvetradio
   ```

3. **Run the deployment script:**
   ```bash
   ./deploy-production.sh
   ```

### What the script does:
- Pulls latest code from `main` branch
- Installs PHP and Node.js dependencies
- Builds production assets with SSR (port 13719)
- Runs database migrations with safety checks
- Clears and rebuilds caches
- Restarts PM2 processes
- Sets proper file permissions

### Environment Configuration

Ensure your `.env` file includes:
```env
APP_ENV=production
APP_URL=https://your-domain.com
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=velvetradio_prod
SSR_PORT=13719
```

### PM2 Configuration

The deployment script manages PM2 processes for:
- Laravel application server
- SSR rendering service (port 13719)
- Queue workers (if configured)

## 🧪 Test Server Deployment (Ubuntu VM)

### Automated Deployment

1. **SSH into your test server**
2. **Navigate to the project directory:**
   ```bash
   cd /var/www/velvetradio
   ```

3. **Run the deployment script:**
   ```bash
   ./deploy-test.sh
   ```

### What the script does:
- Pulls latest code from `testing` branch
- Installs PHP and Node.js dependencies
- Builds assets with SSR (port 13718)
- Runs database migrations
- Clears caches
- Restarts services

### Environment Configuration

Test server `.env` should include:
```env
APP_ENV=staging
APP_URL=https://test.your-domain.com
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=velvetradio_test
SSR_PORT=13718
```

## 🔧 Manual Deployment Steps

If you need to deploy manually:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install dependencies
composer install --optimize-autoloader --no-dev
npm ci

# 3. Build assets
npm run build

# 4. Run migrations
php artisan migrate --force

# 5. Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 6. Restart services
pm2 restart velvetradio
pm2 restart velvetradio-ssr
```

## 🌐 Nginx Configuration

Example Nginx configuration for production:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL configuration
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;

    root /var/www/velvetradio/public;
    index index.php;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔍 Monitoring & Troubleshooting

### Check PM2 processes:
```bash
pm2 list
pm2 logs velvetradio
pm2 logs velvetradio-ssr
```

### Common issues:

**SSR not working:**
- Check if port 13719 (prod) or 13718 (test) is open
- Verify PM2 SSR process is running
- Check SSR logs: `pm2 logs velvetradio-ssr`

**Database connection errors:**
- Verify database credentials in `.env`
- Check database server status
- Run migrations: `php artisan migrate:status`

**Asset compilation failures:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version`
- Verify build process: `npm run build`

### Log locations:
- Laravel logs: `storage/logs/laravel.log`
- PM2 logs: `~/.pm2/logs/`
- Nginx logs: `/var/log/nginx/`

## 🔄 Rollback Procedure

To rollback to a previous deployment:

```bash
# 1. Check git history
git log --oneline -10

# 2. Reset to previous commit
git reset --hard <commit-hash>

# 3. Re-run deployment
./deploy-production.sh
```

## 📊 Performance Optimization

- Enable OPcache in PHP configuration
- Use Redis for sessions and cache (if available)
- Configure database connection pooling
- Set up CDN for static assets
- Monitor with New Relic or similar tools

## 🔐 Security Considerations

- Keep dependencies updated
- Use strong database passwords
- Configure firewall rules
- Enable SSL/TLS
- Regular security audits
- Monitor for vulnerabilities

---

**Last Updated:** January 17, 2026
**Deployment Type:** Hypervisor (AWS EC2 + Ubuntu VM)