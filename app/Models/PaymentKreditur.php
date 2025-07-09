<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentKreditur extends Model
{
    protected $fillable = [
        'kreditur_id',
        'date',
        'amount',
        'payment_method',
        'note',
        'file_image',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
        ];
    }


    public function kreditur(): BelongsTo
    {
        return $this->belongsTo(Kreditur::class);
    }
}
