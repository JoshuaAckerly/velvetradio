<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Composite index on episodes for show-filtered chronological listing
        Schema::table('episodes', function (Blueprint $table) {
            $table->index(['show_id', 'published_at'], 'episodes_show_published_idx');
        });

        // Index for schedule filtering
        Schema::table('shows', function (Blueprint $table) {
            $table->index(['active', 'schedule_day'], 'shows_active_schedule_idx');
        });
    }

    public function down(): void
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->dropIndex('episodes_show_published_idx');
        });

        Schema::table('shows', function (Blueprint $table) {
            $table->dropIndex('shows_active_schedule_idx');
        });
    }
};
