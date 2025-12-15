<?php

namespace Database\Seeders;

use App\Models\Host;
use Illuminate\Database\Seeder;

class HostSeeder extends Seeder
{
    public function run(): void
    {
        $hosts = [
            [
                'name' => 'Alex Morgan',
                'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'avatar' => 'AM',
                'show_id' => 1,
            ],
            [
                'name' => 'Sam Rivera',
                'bio' => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'avatar' => 'SR',
                'show_id' => 2,
            ],
            [
                'name' => 'Jordan Blake',
                'bio' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                'avatar' => 'JB',
                'show_id' => 3,
            ],
        ];

        foreach ($hosts as $host) {
            Host::create($host);
        }
    }
}
