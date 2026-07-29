<?php

namespace App\Observers;

use App\Mail\EpisodePublished;
use App\Models\Episode;
use App\Models\NewsletterSubscriber;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EpisodeObserver
{
    /**
     * Notify all newsletter subscribers when a new episode is created.
     */
    public function created(Episode $episode): void
    {
        // Only notify if mail is configured (not using the log driver in production)
        if (config('mail.mailer') === 'log') {
            return;
        }

        $episode->load('show');

        NewsletterSubscriber::all()->each(function (NewsletterSubscriber $subscriber) use ($episode): void {
            try {
                Mail::to($subscriber->email)
                    ->queue(new EpisodePublished($episode, $subscriber));
            } catch (\Throwable $e) {
                Log::error('Failed to queue episode notification', [
                    'episode_id' => $episode->id,
                    'subscriber_id' => $subscriber->id,
                    'error' => $e->getMessage(),
                ]);
            }
        });
    }
}
