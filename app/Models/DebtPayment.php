<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DebtPayment extends Model
{

    protected $fillable = [
        'debt_id',
        'amount_paid',
        'payment_method',
        'note',
        'created_by',
    ];

    public function debt()
    {
        return $this->belongsTo(Debt::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
