<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'name' => ['nullable', 'string', 'max:255'],
        ]);

        $subscriber = NewsletterSubscriber::firstOrCreate(
            ['email' => $validated['email']],
            ['name' => $validated['name'] ?? null],
        );

        if ($subscriber->wasRecentlyCreated) {
            return response()->json(['message' => 'Subscribed successfully.'], 201);
        }

        return response()->json(['message' => 'You are already subscribed.'], 200);
    }

    public function unsubscribe(string $token): JsonResponse
    {
        $subscriber = NewsletterSubscriber::where('unsubscribe_token', $token)->first();

        if (! $subscriber) {
            return response()->json(['message' => 'Invalid unsubscribe token.'], 404);
        }

        $subscriber->delete();

        return response()->json(['message' => 'Unsubscribed successfully.'], 200);
    }
}
