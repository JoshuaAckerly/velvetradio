<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Host extends Model
{
    /** @phpstan-ignore missingType.generics */
    use HasFactory;

    protected $fillable = [
        'name',
        'bio',
        'avatar',
        'show_id',
    ];

    /** @return BelongsTo<Show, Host> */
    public function show(): BelongsTo
    {
        // @phpstan-ignore-next-line return.type
        return $this->belongsTo(Show::class);
    }
}
