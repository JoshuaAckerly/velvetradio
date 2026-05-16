<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Show;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'slug'        => 'required|string|max:255|unique:shows,slug|alpha_dash',
            'active'      => 'boolean',
        ]);

        Show::create($data);

        return redirect()->route('admin.shows.index')->with('success', 'Show created.');
    }

    public function edit(Show $show): Response
    {
        return Inertia::render('admin/shows/form', ['show' => $show]);
    }

    public function update(Request $request, Show $show): RedirectResponse
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'slug'        => 'required|string|max:255|alpha_dash|unique:shows,slug,' . $show->id,
            'active'      => 'boolean',
        ]);

        $show->update($data);

        return redirect()->route('admin.shows.index')->with('success', 'Show updated.');
    }

    public function destroy(Show $show): RedirectResponse
    {
        $show->delete();

        return redirect()->route('admin.shows.index')->with('success', 'Show deleted.');
    }

    public function generateSlug(Request $request): \Illuminate\Http\JsonResponse
    {
        return response()->json(['slug' => Str::slug($request->string('title'))]);
    }
}
