<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'duration',
        'published_at',
        'show_id'
    ];

    protected $casts = [
        'published_at' => 'date',
        'duration' => 'integer'
    ];

    public function show()
    {
        return $this->belongsTo(Show::class);
    }

    public function getFormattedDurationAttribute()
    {
        $minutes = floor($this->duration / 60);
        $seconds = $this->duration % 60;
        return sprintf('%d:%02d', $minutes, $seconds);
    }
}