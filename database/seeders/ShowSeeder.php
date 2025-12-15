<?php

namespace Database\Seeders;

<<<<<<< HEAD
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
=======
use App\Models\Show;
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
use Illuminate\Database\Seeder;

class ShowSeeder extends Seeder
{
<<<<<<< HEAD
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('shows')->insert([
=======
    public function run(): void
    {
        $shows = [
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
            [
                'title' => 'Lorem Ipsum Radio',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'slug' => 'lorem-ipsum-radio',
                'active' => true,
<<<<<<< HEAD
                'created_at' => now(),
                'updated_at' => now(),
=======
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
            ],
            [
                'title' => 'Dolor Sit Amet',
                'description' => 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'slug' => 'dolor-sit-amet',
                'active' => true,
<<<<<<< HEAD
                'created_at' => now(),
                'updated_at' => now(),
=======
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
            ],
            [
                'title' => 'Consectetur Show',
                'description' => 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                'slug' => 'consectetur-show',
                'active' => true,
<<<<<<< HEAD
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
=======
            ],
        ];

        foreach ($shows as $show) {
            Show::create($show);
        }
>>>>>>> 066b93697d9d31956048c70e4de461df773e1caa
    }
}
