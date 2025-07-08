<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transactions extends Model
{
    protected $fillable = [
        'organization_id',
        'category_id',
        'type',
        'amount',
        'date',
        'file_image',
        'description',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
        ];
    }


    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organizations::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }


    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
