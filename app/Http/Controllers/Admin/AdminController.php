<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Models\Host;
use App\Models\Show;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/index', [
            'counts' => [
                'shows' => Show::count(),
                'episodes' => Episode::count(),
                'hosts' => Host::count(),
            ],
        ]);
    }
}
