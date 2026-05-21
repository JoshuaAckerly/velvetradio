<?php

namespace Database\Seeders;

use App\Models\Host;
use Illuminate\Database\Seeder;

class HostSeeder extends Seeder
{
    public function run(): void
    {
        $shows = \App\Models\Show::all();
        $show0 = $shows->first();
        assert($show0 instanceof \App\Models\Show);
        $show1 = $shows->skip(1)->first();
        assert($show1 instanceof \App\Models\Show);
        $show2 = $shows->skip(2)->first();
        assert($show2 instanceof \App\Models\Show);

        $hosts = [
            [
                'name' => 'Alex Morgan',
                'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'avatar' => 'AM',
                'show_id' => $show0->id,
            ],
            [
                'name' => 'Sam Rivera',
                'bio' => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'avatar' => 'SR',
                'show_id' => $show1->id,
            ],
            [
                'name' => 'Jordan Blake',
                'bio' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                'avatar' => 'JB',
                'show_id' => $show2->id,
            ],
        ];

        foreach ($hosts as $host) {
            Host::create($host);
        }
    }
}
