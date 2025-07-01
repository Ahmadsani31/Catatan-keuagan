<?php

namespace App\Models;

use App\Enums\OrganizationsStatus;
use Illuminate\Database\Eloquent\Model;

class OrganizationUser extends Model
{
    protected $fillable = [
        'organization_id',
        'user_id',
    ];
}
