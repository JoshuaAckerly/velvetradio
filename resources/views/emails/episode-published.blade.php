<x-mail::message>
# New Episode: {{ $episode->title }}

@if($episode->show)
**Show:** {{ $episode->show->title }}
@endif

@if($episode->description)
{{ $episode->description }}
@endif

@if($episode->published_at)
**Published:** {{ $episode->published_at->format('F j, Y') }}
@endif

<x-mail::button :url="config('app.url') . '/shows/' . optional($episode->show)->slug">
Listen Now
</x-mail::button>

---

You're receiving this because you subscribed to updates from {{ config('app.name') }}.

[Unsubscribe]({{ config('app.url') }}/newsletter/unsubscribe/{{ $subscriber->unsubscribe_token }})

Thanks,
{{ config('app.name') }}
</x-mail::message>
