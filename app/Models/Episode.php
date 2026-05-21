<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Episode extends Model
{
    /** @phpstan-ignore missingType.generics */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'duration',
        'published_at',
        'audio_file',
        'show_id',
    ];

    protected $casts = [
        'published_at' => 'date',
        'duration' => 'integer',
    ];

    /** @return BelongsTo<Show, Episode> */
    public function show(): BelongsTo
    {
        // @phpstan-ignore-next-line return.type
        return $this->belongsTo(Show::class);
    }

    public function getFormattedDurationAttribute(): string
    {
        $minutes = floor($this->duration / 60);
        $seconds = $this->duration % 60;

        return sprintf('%d:%02d', $minutes, $seconds);
    }
}
