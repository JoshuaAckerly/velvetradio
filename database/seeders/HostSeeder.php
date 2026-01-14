<?php

namespace Database\Seeders;

use App\Models\Host;
use Illuminate\Database\Seeder;

class HostSeeder extends Seeder
{
    public function run(): void
    {
        $shows = \App\Models\Show::all();

        $hosts = [
            [
                'name' => 'Alex Morgan',
                'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'avatar' => 'AM',
                'show_id' => $shows->first()->id,
            ],
            [
                'name' => 'Sam Rivera',
                'bio' => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'avatar' => 'SR',
                'show_id' => $shows->skip(1)->first()->id,
            ],
            [
                'name' => 'Jordan Blake',
                'bio' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                'avatar' => 'JB',
                'show_id' => $shows->skip(2)->first()->id,
            ],
        ];

        foreach ($hosts as $host) {
            Host::create($host);
        }
    }
}
