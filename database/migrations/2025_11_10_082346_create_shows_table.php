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
<<<<<<< HEAD
        Schema::create('shows', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('slug')->unique();
            $table->boolean('active')->default(true);
            $table->timestamps();
            
            $table->index('active');
        });
=======
        if (!Schema::hasTable('shows')) {
            Schema::create('shows', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('description');
                $table->string('slug')->unique();
                $table->boolean('active')->default(true);
                $table->timestamps();
                
                $table->index('active');
            });
        }
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shows');
    }
};
