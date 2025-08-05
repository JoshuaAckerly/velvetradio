<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description', 
        'slug',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public function hosts()
    {
        return $this->hasMany(Host::class);
    }

    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }
}