#!/bin/bash
# Emergency Deployment Fix for velvetradio.com
# Run this ONCE on the server to mark existing migrations as complete

set -e

echo "🔧 Emergency fix for velvetradio deployment"
echo "This will mark existing migrations as complete without running them"

cd /home/forge/velvetradio.com

# Ensure we're using the right environment
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found"
    exit 1
fi

echo "📝 Marking migrations as complete..."

# Get database connection info
php artisan tinker --execute="
    // Mark all migrations as run without actually running them
    \$migrations = [
        '0001_01_01_000000_create_users_table',
        '0001_01_01_000001_create_cache_table',
        '0001_01_01_000002_create_jobs_table',
        '2025_11_10_082346_create_shows_table',
        '2025_11_10_082354_create_hosts_table',
        '2025_11_10_082401_create_episodes_table',
    ];

    foreach (\$migrations as \$migration) {
        \$exists = DB::table('migrations')->where('migration', \$migration)->exists();
        if (!\$exists) {
            DB::table('migrations')->insert([
                'migration' => \$migration,
                'batch' => 1
            ]);
            echo \"✅ Marked: \$migration\n\";
        } else {
            echo \"ℹ️  Already marked: \$migration\n\";
        }
    }
    
    echo \"\n✅ All migrations marked as complete\";
"

echo ""
echo "🎉 Fix complete! You can now deploy normally from Forge."
echo "💡 Next steps:"
echo "   1. Go to your Forge dashboard"
echo "   2. Click 'Deploy Now' on velvetradio.com"
echo "   3. The deployment should succeed this time"
