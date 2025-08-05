<?php

namespace Database\Seeders;

use App\Models\Show;
use Illuminate\Database\Seeder;

class ShowSeeder extends Seeder
{
    public function run(): void
    {
        $shows = [
            [
                'title' => 'Lorem Ipsum Radio',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'slug' => 'lorem-ipsum-radio',
                'active' => true,
            ],
            [
                'title' => 'Dolor Sit Amet',
                'description' => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'slug' => 'dolor-sit-amet',
                'active' => true,
            ],
            [
                'title' => 'Consectetur Show',
                'description' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                'slug' => 'consectetur-show',
                'active' => true,
            ],
        ];

        foreach ($shows as $show) {
            Show::create($show);
        }
    }
}
