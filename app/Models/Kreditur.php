<?php

namespace App\Models;

use App\Enums\KreditursStatus;
use App\Observers\KrediturObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[ObservedBy([KrediturObserver::class])]
class Kreditur extends Model
{
    protected $fillable = [
        'organization_id',
        'user_id',
        'name',
        'slug',
        'phone',
        'address',
        'status',
        'date',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'status' => KreditursStatus::class,
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

    public function cash(): HasOne
    {
        return $this->hasOne(Cash::class);
    }

    public function paymentKreditur(): HasMany
    {
        return $this->hasMany(PaymentKreditur::class);
    }
}
