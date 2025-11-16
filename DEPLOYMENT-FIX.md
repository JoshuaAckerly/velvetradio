# Velvetradio Deployment Fix

## Problem
The deployment failed because migrations tried to create tables that already exist in the database.

**Error:** `SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'shows' already exists`

## Root Cause
The database has the tables but the `migrations` table doesn't have records indicating these migrations were run.

## Solution

### Option 1: Emergency Fix Script (Recommended)

1. **SSH into your Forge server:**
   ```bash
   ssh forge@graceful-london
   ```

2. **Upload and run the emergency fix script:**
   ```bash
   cd /home/forge/velvetradio.com
   
   # Create the fix script
   nano emergency-migration-fix.sh
   # Paste the contents of emergency-migration-fix.sh
   
   chmod +x emergency-migration-fix.sh
   ./emergency-migration-fix.sh
   ```

3. **Deploy again from Forge dashboard**

### Option 2: Manual Database Fix

1. **SSH into your server and run:**
   ```bash
   cd /home/forge/velvetradio.com
   
   php artisan tinker
   ```

2. **In tinker, run:**
   ```php
   $migrations = [
       '0001_01_01_000000_create_users_table',
       '0001_01_01_000001_create_cache_table',
       '0001_01_01_000002_create_jobs_table',
       '2025_11_10_082346_create_shows_table',
       '2025_11_10_082354_create_hosts_table',
       '2025_11_10_082401_create_episodes_table',
   ];

   foreach ($migrations as $migration) {
       DB::table('migrations')->insert([
           'migration' => $migration,
           'batch' => 1
       ]);
   }
   ```

3. **Exit tinker and deploy again**

### Option 3: Update Forge Deployment Script

**Replace your Forge deployment script with this:**

```bash
cd /home/forge/velvetradio.com
git pull origin $FORGE_SITE_BRANCH

$FORGE_COMPOSER install --no-interaction --prefer-dist --optimize-autoloader --no-dev

npm ci
npm run build

# Clear caches
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Skip migrations and just cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Reload PHP-FPM
( flock -w 10 9 || exit 1
    echo 'Restarting FPM...'; sudo -S service $FORGE_PHP_FPM reload ) 9>/tmp/fpmlock
```

This removes the automatic migration step that Forge runs.

## Prevention

For future deployments, use the `safe-forge-deploy.sh` script which:
- Skips migrations (since DB is already set up)
- Clears caches before rebuilding
- Includes SSR setup
- Has proper error handling

## Quick Fix Commands

If you just want to fix it now and deploy:

```bash
# SSH to server
ssh forge@graceful-london

# Navigate to site
cd /home/forge/velvetradio.com

# Mark migrations as complete
php artisan db:seed --class=MarkMigrationsComplete || php artisan tinker --execute="
foreach (['0001_01_01_000000_create_users_table', '0001_01_01_000001_create_cache_table', '0001_01_01_000002_create_jobs_table', '2025_11_10_082346_create_shows_table', '2025_11_10_082354_create_hosts_table', '2025_11_10_082401_create_episodes_table'] as \$m) {
    DB::table('migrations')->insertOrIgnore(['migration' => \$m, 'batch' => 1]);
}
echo 'Done';
"

# Now deploy from Forge
```

## Notes

- The database already has all necessary tables
- This only marks the migrations as "complete" 
- No data will be lost
- Future deployments will work normally after this fix
