<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/shows', function () {
    $shows = DB::table('shows')
        ->leftJoin('hosts', 'shows.id', '=', 'hosts.show_id')
        ->leftJoin('episodes', 'shows.id', '=', 'episodes.show_id')
        ->select(
            'shows.id',
            'shows.title',
            'shows.description',
            'hosts.name as host_name',
            DB::raw('COUNT(episodes.id) as episode_count')
        )
        ->where('shows.active', true)
        ->groupBy('shows.id', 'shows.title', 'shows.description', 'hosts.name')
        ->limit(20)
        ->get()
        ->map(function ($show) {
            return [
                'id' => $show->id,
                'title' => $show->title,
                'host' => $show->host_name,
                'description' => $show->description,
                'episodes' => $show->episode_count,
            ];
        });

    return Inertia::render('shows', [
        'shows' => $shows
    ]);
})->name('shows');

Route::get('/hosts', function () {
    $hosts = DB::table('hosts')
        ->join('shows', 'hosts.show_id', '=', 'shows.id')
        ->select(
            'hosts.id',
            'hosts.name',
            'hosts.bio',
            'hosts.avatar',
            'shows.title as show_title'
        )
        ->where('shows.active', true)
        ->limit(20)
        ->get()
        ->map(function ($host) {
            return [
                'id' => $host->id,
                'name' => $host->name,
                'show' => $host->show_title,
                'bio' => $host->bio,
                'avatar' => $host->avatar,
            ];
        });

    return Inertia::render('hosts', [
        'hosts' => $hosts
    ]);
})->name('hosts');

Route::get('/episodes', function () {
    $episodes = DB::table('episodes')
        ->join('shows', 'episodes.show_id', '=', 'shows.id')
        ->join('hosts', 'shows.id', '=', 'hosts.show_id')
        ->select(
            'episodes.id',
            'episodes.title',
            'episodes.duration',
            'episodes.published_at',
            'shows.title as show_title',
            'hosts.name as host_name'
        )
        ->where('shows.active', true)
        ->orderBy('episodes.published_at', 'desc')
        ->limit(50)
        ->get()
        ->map(function ($episode) {
            return [
                'id' => $episode->id,
                'title' => $episode->title,
                'show' => $episode->show_title,
                'host' => $episode->host_name,
                'duration' => gmdate('i:s', $episode->duration),
                'date' => $episode->published_at,
            ];
        });

    return Inertia::render('episodes', [
        'episodes' => $episodes
    ]);
})->name('episodes');

require __DIR__.'/settings.php';
