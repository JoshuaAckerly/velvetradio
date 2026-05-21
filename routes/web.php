<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\EpisodeController as AdminEpisodeController;
use App\Http\Controllers\Admin\HostController as AdminHostController;
use App\Http\Controllers\Admin\ShowController as AdminShowController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/shows', function () {
    $shows = DB::table('shows')
        ->leftJoin('hosts', 'shows.id', '=', 'hosts.show_id')
        ->select(
            'shows.id',
            'shows.title',
            'shows.description',
            'hosts.name as host_name',
            DB::raw('(SELECT COUNT(*) FROM episodes WHERE episodes.show_id = shows.id) as episode_count')
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
        'shows' => $shows,
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
        'hosts' => $hosts,
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
            'episodes.audio_file',
            'shows.title as show_title',
            'hosts.name as host_name'
        )
        ->where('shows.active', true)
        ->orderBy('episodes.published_at', 'desc')
        ->limit(50)
        ->get()
        ->map(function ($episode) {
            $audioFile = $episode->audio_file;

            return [
                'id' => $episode->id,
                'title' => $episode->title,
                'show' => $episode->show_title,
                'host' => $episode->host_name,
                'duration' => is_int($episode->duration) ? gmdate('i:s', $episode->duration) : '0:00',
                'date' => $episode->published_at,
                'audio_url' => is_string($audioFile) && $audioFile !== '' ? asset('storage/'.$audioFile) : null,
            ];
        });

    return Inertia::render('episodes', [
        'episodes' => $episodes,
    ]);
})->name('episodes');

Route::get('/listen', function () {
    return Inertia::render('listen');
})->name('listen');

require __DIR__.'/settings.php';

// Admin panel — requires authenticated user
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');

    Route::get('/shows', [AdminShowController::class, 'index'])->name('shows.index');
    Route::get('/shows/create', [AdminShowController::class, 'create'])->name('shows.create');
    Route::post('/shows', [AdminShowController::class, 'store'])->name('shows.store');
    Route::get('/shows/{show}/edit', [AdminShowController::class, 'edit'])->name('shows.edit');
    Route::put('/shows/{show}', [AdminShowController::class, 'update'])->name('shows.update');
    Route::delete('/shows/{show}', [AdminShowController::class, 'destroy'])->name('shows.destroy');
    Route::post('/shows/slug', [AdminShowController::class, 'generateSlug'])->name('shows.slug');

    Route::get('/episodes', [AdminEpisodeController::class, 'index'])->name('episodes.index');
    Route::get('/episodes/create', [AdminEpisodeController::class, 'create'])->name('episodes.create');
    Route::post('/episodes', [AdminEpisodeController::class, 'store'])->name('episodes.store');
    Route::get('/episodes/{episode}/edit', [AdminEpisodeController::class, 'edit'])->name('episodes.edit');
    Route::put('/episodes/{episode}', [AdminEpisodeController::class, 'update'])->name('episodes.update');
    Route::delete('/episodes/{episode}', [AdminEpisodeController::class, 'destroy'])->name('episodes.destroy');

    Route::get('/hosts', [AdminHostController::class, 'index'])->name('hosts.index');
    Route::get('/hosts/create', [AdminHostController::class, 'create'])->name('hosts.create');
    Route::post('/hosts', [AdminHostController::class, 'store'])->name('hosts.store');
    Route::get('/hosts/{host}/edit', [AdminHostController::class, 'edit'])->name('hosts.edit');
    Route::put('/hosts/{host}', [AdminHostController::class, 'update'])->name('hosts.update');
    Route::delete('/hosts/{host}', [AdminHostController::class, 'destroy'])->name('hosts.destroy');
});
