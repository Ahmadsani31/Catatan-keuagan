<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transactions extends Model
{
    protected $fillable = [
        'organization_id',
        'category_id',
        'bank_id',
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
            'amount'      => 'decimal:2',
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

    public function bank(): BelongsTo
    {
        return $this->belongsTo(Bank::class);
    }

    /**
     * Hitung delta saldo untuk transaksi ini.
     * in  => +amount
     * out => -amount
     */
    public function currentDelta(): string
    {
        // string untuk menjaga presisi decimal
        return $this->type === 'Pemasukan'
            ? (string) $this->amount
            : bcmul((string)$this->amount, '-1', 2);
    }

    /**
     * Hitung delta saldo berdasarkan nilai original (sebelum update).
     */
    public function originalDelta(): string
    {
        $origType   = $this->getOriginal('type');
        $origAmount = $this->getOriginal('amount');

        if ($origType === 'Pemasukan') {
            return (string) $origAmount;
        }
        return bcmul((string)$origAmount, '-1', 2);
    }
}
