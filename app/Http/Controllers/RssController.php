<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class RssController extends Controller
{
    /**
     * RSS feed for all shows (latest 100 episodes across all shows).
     */
    public function index(): Response
    {
        $xml = Cache::remember('rss.global', 1800, function (): string {
            $siteUrl = config('app.url');
            $appName = config('app.name');

            $episodes = DB::table('episodes')
                ->join('shows', 'episodes.show_id', '=', 'shows.id')
                ->select(
                    'episodes.id',
                    'episodes.title',
                    'episodes.description',
                    'episodes.audio_file',
                    'episodes.duration',
                    'episodes.published_at',
                    'shows.title as show_title',
                    'shows.slug as show_slug',
                    'shows.description as show_description',
                )
                ->where('shows.active', true)
                ->orderByDesc('episodes.published_at')
                ->limit(100)
                ->get();

            return $this->buildFeed(
                title: $appName,
                link: $siteUrl,
                description: 'All shows and episodes from '.$appName,
                feedUrl: $siteUrl.'/rss',
                episodes: $episodes,
                siteUrl: $siteUrl,
            );
        });

        return response($xml, 200, [
            'Content-Type' => 'application/rss+xml; charset=UTF-8',
            'X-Robots-Tag' => 'noindex',
        ]);
    }

    /**
     * RSS feed for a single show.
     */
    public function show(Request $request, string $slug): Response
    {
        $show = DB::table('shows')
            ->where('slug', $slug)
            ->where('active', true)
            ->first();

        if (! $show) {
            abort(404);
        }

        $xml = Cache::remember("rss.show.{$show->id}", 1800, function () use ($show): string {
            $siteUrl = config('app.url');

            $episodes = DB::table('episodes')
                ->where('show_id', $show->id)
                ->select(
                    'id',
                    'title',
                    'description',
                    'audio_file',
                    'duration',
                    'published_at',
                    DB::raw("'{$show->title}' as show_title"),
                    DB::raw("'{$show->slug}' as show_slug"),
                )
                ->orderByDesc('published_at')
                ->limit(100)
                ->get();

            return $this->buildFeed(
                title: $show->title,
                link: $siteUrl.'/shows/'.$show->slug,
                description: $show->description ?? $show->title,
                feedUrl: $siteUrl.'/rss/'.$show->slug,
                episodes: $episodes,
                siteUrl: $siteUrl,
            );
        });

        return response($xml, 200, [
            'Content-Type' => 'application/rss+xml; charset=UTF-8',
            'X-Robots-Tag' => 'noindex',
        ]);
    }

    /**
     * Build the RSS XML string.
     *
     * @param  Collection<int, object>  $episodes
     */
    private function buildFeed(
        string $title,
        string $link,
        string $description,
        string $feedUrl,
        Collection $episodes,
        string $siteUrl,
    ): string {
        $title = htmlspecialchars($title, ENT_XML1);
        $description = htmlspecialchars($description, ENT_XML1);
        $link = htmlspecialchars($link, ENT_XML1);
        $feedUrl = htmlspecialchars($feedUrl, ENT_XML1);
        $buildDate = now()->toRfc2822String();

        $items = $episodes->map(function (object $episode) use ($siteUrl): string {
            $epTitle = htmlspecialchars((string) $episode->title, ENT_XML1);
            $epDesc = htmlspecialchars((string) ($episode->description ?? ''), ENT_XML1);
            $pubDate = date('r', strtotime((string) $episode->published_at));
            $guid = $siteUrl.'/episodes/'.$episode->id;
            $audioUrl = (is_string($episode->audio_file) && $episode->audio_file !== '')
                ? htmlspecialchars(asset('storage/'.$episode->audio_file), ENT_XML1)
                : '';
            $durationFormatted = is_int($episode->duration)
                ? gmdate('H:i:s', $episode->duration)
                : '00:00:00';

            $enclosure = $audioUrl !== ''
                ? "<enclosure url=\"{$audioUrl}\" type=\"audio/mpeg\" />"
                : '';

            return <<<XML
        <item>
            <title>{$epTitle}</title>
            <description>{$epDesc}</description>
            <pubDate>{$pubDate}</pubDate>
            <guid isPermaLink="false">{$guid}</guid>
            <itunes:duration>{$durationFormatted}</itunes:duration>
            {$enclosure}
        </item>
XML;
        })->implode("\n");

        return <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
    xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>{$title}</title>
        <link>{$link}</link>
        <description>{$description}</description>
        <language>en-us</language>
        <lastBuildDate>{$buildDate}</lastBuildDate>
        <atom:link href="{$feedUrl}" rel="self" type="application/rss+xml" />
{$items}
    </channel>
</rss>
XML;
    }
}
