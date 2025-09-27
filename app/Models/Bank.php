<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bank extends Model
{
    protected $fillable = [
        'name',
        'alias',
        'account_number',
        'organization_id',
        'user_id',
        'amount',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'amount'      => 'decimal:2',
            'date' => 'datetime',
        ];
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transactions::class);
    }
}
