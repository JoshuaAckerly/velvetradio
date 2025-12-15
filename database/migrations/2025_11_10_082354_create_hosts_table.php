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
        Schema::create('hosts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('bio')->nullable();
            $table->string('avatar')->nullable();
            $table->foreignId('show_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
=======
        if (!Schema::hasTable('hosts')) {
            Schema::create('hosts', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->text('bio')->nullable();
                $table->string('avatar')->nullable();
                $table->foreignId('show_id')->constrained()->onDelete('cascade');
                $table->timestamps();
            });
        }
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hosts');
    }
};
