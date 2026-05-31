<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Show;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ShowController extends Controller
{
    public function index(): Response
    {
        $shows = Show::withCount(['hosts', 'episodes'])
            ->orderBy('title')
            ->get(['id', 'title', 'slug', 'active', 'created_at']);

        return Inertia::render('admin/shows/index', ['shows' => $shows]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/shows/form', ['show' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        /** @var array<string, mixed> $data */
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'slug' => 'required|string|max:255|unique:shows,slug|alpha_dash',
            'active' => 'boolean',
            'schedule_day' => 'nullable|string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'schedule_time' => 'nullable|date_format:H:i',
        ]);

        Show::create($data);
        Cache::forget('shows.index');
        Cache::forget('shows.schedule');

        return redirect()->route('admin.shows.index')->with('success', 'Show created.');
    }

    public function edit(Show $show): Response
    {
        return Inertia::render('admin/shows/form', ['show' => $show]);
    }

    public function update(Request $request, Show $show): RedirectResponse
    {
        /** @var array<string, mixed> $data */
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'slug' => 'required|string|max:255|alpha_dash|unique:shows,slug,'.$show->id,
            'active' => 'boolean',
            'schedule_day' => 'nullable|string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'schedule_time' => 'nullable|date_format:H:i',
        ]);

        $show->update($data);
        Cache::forget('shows.index');
        Cache::forget('shows.schedule');

        return redirect()->route('admin.shows.index')->with('success', 'Show updated.');
    }

    public function destroy(Show $show): RedirectResponse
    {
        $show->delete();
        Cache::forget('shows.index');
        Cache::forget('shows.schedule');

        return redirect()->route('admin.shows.index')->with('success', 'Show deleted.');
    }

    public function generateSlug(Request $request): JsonResponse
    {
        return response()->json(['slug' => Str::slug($request->string('title'))]);
    }
}
