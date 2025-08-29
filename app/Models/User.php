<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getRoles()
    {
        return $this->getRoleNames();
    }

    public function getUserPermissions()
    {
        return $this->getAllPermissions()->pluck('name');
    }

    public function organizations(): BelongsToMany
    {
        return $this->belongsToMany(Organizations::class,  OrganizationUser::class, 'user_id', 'organization_id')
            ->withTimestamps();
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transactions::class);
    }

    public function debts(): HasMany
    {
        return $this->hasMany(Debt::class, 'created_by');
    }

    public function createdTransactions()
    {
        return $this->hasMany(Transactions::class, 'created_by');
    }

    public function updatedTransactions()
    {
        return $this->hasMany(Transactions::class, 'updated_by');
    }

    // public function createdDebts()
    // {
    //     return $this->hasMany(Debt::class, 'created_by');
    // }

    // public function updatedDebts()
    // {
    //     return $this->hasMany(Debt::class, 'updated_by');
    // }
}
