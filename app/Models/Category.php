<?php

namespace App\Models;

use App\Enums\CategoryType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'organization_id',
        'user_id',
        'name',
        'type',

    ];

    protected function casts(): array
    {
        return [
            'type' => CategoryType::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organizations::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transactions::class);
    }
}
