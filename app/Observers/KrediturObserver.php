<?php

namespace App\Observers;

use App\Models\Kreditur;

class KrediturObserver
{
    /**
     * Handle the Kreditur "created" event.
     */
    public function created(Kreditur $kreditur): void
    {
        $kreditur->cash()->create([
            'amount' => $total = request()->amount,
            'available' => $total,
        ]);
    }

    /**
     * Handle the Kreditur "updated" event.
     */
    public function updated(Kreditur $kreditur): void
    {
        //
    }

    /**
     * Handle the Kreditur "deleted" event.
     */
    public function deleted(Kreditur $kreditur): void
    {
        //
    }

    /**
     * Handle the Kreditur "restored" event.
     */
    public function restored(Kreditur $kreditur): void
    {
        //
    }

    /**
     * Handle the Kreditur "force deleted" event.
     */
    public function forceDeleted(Kreditur $kreditur): void
    {
        //
    }
}
