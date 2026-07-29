<?php

namespace App\Mail;

use App\Models\Episode;
use App\Models\NewsletterSubscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EpisodePublished extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly Episode $episode,
        public readonly NewsletterSubscriber $subscriber,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Episode: '.$this->episode->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.episode-published',
        );
    }
}
