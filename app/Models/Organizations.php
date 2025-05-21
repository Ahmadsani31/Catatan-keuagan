<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organizations extends Model
{
    //

    public function categories()
    {
        return $this->hasMany(Categories::class);
    }
}
