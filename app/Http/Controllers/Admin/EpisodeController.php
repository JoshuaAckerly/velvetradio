<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Models\Show;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EpisodeController extends Controller
{
    public function index(): Response
    {
        $episodes = Episode::with('show:id,title')
            ->orderByDesc('published_at')
            ->get(['id', 'show_id', 'title', 'duration', 'published_at', 'audio_file']);

        return Inertia::render('admin/episodes/index', ['episodes' => $episodes]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/episodes/form', [
            'episode' => null,
            'shows' => Show::orderBy('title')->get(['id', 'title']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'show_id' => 'required|integer|exists:shows,id',
            'published_at' => 'required|date',
            'duration' => 'nullable|integer|min:0',
            'audio_file' => 'nullable|file|mimes:mp3,wav,ogg,aac,m4a|max:204800',
        ]);

        if ($request->hasFile('audio_file')) {
            $data['audio_file'] = $request->file('audio_file')->store('episodes', 'public');
        } else {
            unset($data['audio_file']);
        }

        Episode::create($data);

        return redirect()->route('admin.episodes.index')->with('success', 'Episode created.');
    }

    public function edit(Episode $episode): Response
    {
        return Inertia::render('admin/episodes/form', [
            'episode' => $episode,
            'shows' => Show::orderBy('title')->get(['id', 'title']),
        ]);
    }

    public function update(Request $request, Episode $episode): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'show_id' => 'required|integer|exists:shows,id',
            'published_at' => 'required|date',
            'duration' => 'nullable|integer|min:0',
            'audio_file' => 'nullable|file|mimes:mp3,wav,ogg,aac,m4a|max:204800',
        ]);

        if ($request->hasFile('audio_file')) {
            $data['audio_file'] = $request->file('audio_file')->store('episodes', 'public');
        } else {
            unset($data['audio_file']);
        }

        $episode->update($data);

        return redirect()->route('admin.episodes.index')->with('success', 'Episode updated.');
    }

    public function destroy(Episode $episode): RedirectResponse
    {
        $episode->delete();

        return redirect()->route('admin.episodes.index')->with('success', 'Episode deleted.');
    }
}
