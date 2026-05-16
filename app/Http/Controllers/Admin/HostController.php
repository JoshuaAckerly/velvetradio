<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Host;
use App\Models\Show;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HostController extends Controller
{
    public function index(): Response
    {
        $hosts = Host::with('show:id,title')
            ->orderBy('name')
            ->get(['id', 'show_id', 'name', 'bio', 'avatar']);

        return Inertia::render('admin/hosts/index', ['hosts' => $hosts]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/hosts/form', [
            'host' => null,
            'shows' => Show::orderBy('title')->get(['id', 'title']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'avatar' => 'nullable|url|max:500',
            'show_id' => 'required|integer|exists:shows,id',
        ]);

        Host::create($data);

        return redirect()->route('admin.hosts.index')->with('success', 'Host created.');
    }

    public function edit(Host $host): Response
    {
        return Inertia::render('admin/hosts/form', [
            'host' => $host,
            'shows' => Show::orderBy('title')->get(['id', 'title']),
        ]);
    }

    public function update(Request $request, Host $host): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'avatar' => 'nullable|url|max:500',
            'show_id' => 'required|integer|exists:shows,id',
        ]);

        $host->update($data);

        return redirect()->route('admin.hosts.index')->with('success', 'Host updated.');
    }

    public function destroy(Host $host): RedirectResponse
    {
        $host->delete();

        return redirect()->route('admin.hosts.index')->with('success', 'Host deleted.');
    }
}
