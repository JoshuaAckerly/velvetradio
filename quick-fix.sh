#!/bin/bash
# Simple one-command fix for velvetradio deployment
# Copy and paste this entire script into your SSH terminal on the server

cd /home/forge/velvetradio.com

echo "🔧 Fixing migration state..."

php artisan tinker --execute="
DB::table('migrations')->insertOrIgnore([
    ['migration' => '0001_01_01_000000_create_users_table', 'batch' => 1],
    ['migration' => '0001_01_01_000001_create_cache_table', 'batch' => 1],
    ['migration' => '0001_01_01_000002_create_jobs_table', 'batch' => 1],
    ['migration' => '2025_11_10_082346_create_shows_table', 'batch' => 1],
    ['migration' => '2025_11_10_082354_create_hosts_table', 'batch' => 1],
    ['migration' => '2025_11_10_082401_create_episodes_table', 'batch' => 1],
]);
echo '✅ Migrations marked as complete. Deploy again from Forge.';
"
