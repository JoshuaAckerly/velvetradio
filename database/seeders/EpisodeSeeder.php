<?php

namespace Database\Seeders;

use App\Models\Episode;
use Illuminate\Database\Seeder;

class EpisodeSeeder extends Seeder
{
    public function run(): void
    {
        $episodes = [
            [
                'title' => 'Lorem Ipsum Dolor',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'duration' => 2732, // 45:32
                'published_at' => '2024-01-15',
                'show_id' => 1,
            ],
            [
                'title' => 'Consectetur Adipiscing',
                'description' => 'Ut enim ad minim veniam, quis nostrud exercitation.',
                'duration' => 2301, // 38:21
                'published_at' => '2024-01-12',
                'show_id' => 2,
            ],
            [
                'title' => 'Sed Do Eiusmod',
                'description' => 'Duis aute irure dolor in reprehenderit in voluptate.',
                'duration' => 3138, // 52:18
                'published_at' => '2024-01-10',
                'show_id' => 3,
            ],
            [
                'title' => 'Tempor Incididunt',
                'description' => 'Excepteur sint occaecat cupidatat non proident.',
                'duration' => 2505, // 41:45
                'published_at' => '2024-01-08',
                'show_id' => 1,
            ],
            [
                'title' => 'Ut Labore Dolore',
                'description' => 'Sunt in culpa qui officia deserunt mollit anim.',
                'duration' => 2172, // 36:12
                'published_at' => '2024-01-05',
                'show_id' => 2,
            ],
            [
                'title' => 'Magna Aliqua',
                'description' => 'Sed ut perspiciatis unde omnis iste natus error.',
                'duration' => 2913, // 48:33
                'published_at' => '2024-01-03',
                'show_id' => 3,
            ],
        ];

        foreach ($episodes as $episode) {
            Episode::create($episode);
        }
    }
}
