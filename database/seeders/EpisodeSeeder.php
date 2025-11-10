<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EpisodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('episodes')->insert([
            [
                'title' => 'Lorem Ipsum Dolor',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'duration' => 2732, // 45:32
                'published_at' => '2024-01-15',
                'show_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Consectetur Adipiscing',
                'description' => 'Ut enim ad minim veniam, quis nostrud exercitation.',
                'duration' => 2301, // 38:21
                'published_at' => '2024-01-12',
                'show_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Sed Do Eiusmod',
                'description' => 'Duis aute irure dolor in reprehenderit in voluptate.',
                'duration' => 3138, // 52:18
                'published_at' => '2024-01-10',
                'show_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Tempor Incididunt',
                'description' => 'Excepteur sint occaecat cupidatat non proident.',
                'duration' => 2505, // 41:45
                'published_at' => '2024-01-08',
                'show_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Ut Labore Dolore',
                'description' => 'Sunt in culpa qui officia deserunt mollit anim.',
                'duration' => 2172, // 36:12
                'published_at' => '2024-01-05',
                'show_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Magna Aliqua',
                'description' => 'Sed ut perspiciatis unde omnis iste natus error.',
                'duration' => 2913, // 48:33
                'published_at' => '2024-01-03',
                'show_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
