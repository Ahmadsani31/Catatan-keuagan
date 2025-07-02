<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transactions extends Model
{
    protected $fillable = [
        'organization_id',
        'type',
        'amount',
        'date',
        'description',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
        ];
    }


    public function organization()
    {
        return $this->belongsTo(Organizations::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
