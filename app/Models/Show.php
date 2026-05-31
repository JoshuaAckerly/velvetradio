<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Show extends Model
{
    /** @phpstan-ignore missingType.generics */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'slug',
        'active',
        'schedule_day',
        'schedule_time',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    /** @return HasMany<Host, Show> */
    public function hosts(): HasMany
    {
        // @phpstan-ignore-next-line return.type
        return $this->hasMany(Host::class);
    }

    /** @return HasMany<Episode, Show> */
    public function episodes(): HasMany
    {
        // @phpstan-ignore-next-line return.type
        return $this->hasMany(Episode::class);
    }
}
