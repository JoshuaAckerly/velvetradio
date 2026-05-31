<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('shows', function (Blueprint $table) {
            $table->string('schedule_day')->nullable()->after('active'); // e.g. "Monday"
            $table->time('schedule_time')->nullable()->after('schedule_day'); // e.g. "18:00:00"
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shows', function (Blueprint $table) {
            $table->dropColumn(['schedule_day', 'schedule_time']);
        });
    }
};
