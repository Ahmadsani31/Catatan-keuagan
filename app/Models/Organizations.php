<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organizations extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'name',
        'slug',
        'keterangan',
        'address',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, OrganizationUser::class, 'organization_id', 'user_id')
            ->withTimestamps();
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class, 'organization_id');
    }


    public function transactions(): HasMany
    {
        return $this->hasMany(Transactions::class);
    }

    public function debts(): HasMany
    {
        return $this->hasMany(Debt::class);
    }
}
