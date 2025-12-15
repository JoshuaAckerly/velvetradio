<?php

namespace Database\Seeders;

<<<<<<< HEAD
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
=======
use App\Models\Host;
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
use Illuminate\Database\Seeder;

class HostSeeder extends Seeder
{
<<<<<<< HEAD
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('hosts')->insert([
=======
    public function run(): void
    {
        $hosts = [
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
            [
                'name' => 'Alex Morgan',
                'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'avatar' => 'AM',
                'show_id' => 1,
<<<<<<< HEAD
                'created_at' => now(),
                'updated_at' => now(),
=======
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
            ],
            [
                'name' => 'Sam Rivera',
                'bio' => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'avatar' => 'SR',
                'show_id' => 2,
<<<<<<< HEAD
                'created_at' => now(),
                'updated_at' => now(),
=======
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
            ],
            [
                'name' => 'Jordan Blake',
                'bio' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                'avatar' => 'JB',
                'show_id' => 3,
<<<<<<< HEAD
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
=======
            ],
        ];

        foreach ($hosts as $host) {
            Host::create($host);
        }
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
    }
}
