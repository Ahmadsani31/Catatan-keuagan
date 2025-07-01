<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Debt extends Model
{
    protected $fillable = [
        'organization_id',
        'debtor_name',
        'amount',
        'status',
        'date',
        'notes',
        'created_by',
    ];

    public function organization()
    {
        return $this->belongsTo(Organizations::class);
    }

    public function payments()
    {
        return $this->hasMany(DebtPayment::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
