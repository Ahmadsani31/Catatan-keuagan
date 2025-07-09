<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cash extends Model
{
    protected $fillable = [
        'kreditur_id',
        'amount',
        'available',
        'pay',
    ];

    public function kreditur(): BelongsTo
    {
        return $this->belongsTo(Kreditur::class);
    }
}
