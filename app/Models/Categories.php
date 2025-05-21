<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    //

    public function organization()
    {
        return $this->belongsTo(Organizations::class);
    }

    // public function transactions()
    // {
    //     return $this->hasMany(Transaction::class);
    // }
}
