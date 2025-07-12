<?php

namespace App\Observers;

use App\Models\Transactions;

class TransactionObserver
{
    /**
     * Handle the Transactions "created" event.
     */
    public function created(Transactions $transactions): void
    {
        //
    }

    /**
     * Handle the Transactions "updated" event.
     */
    public function updated(Transactions $transactions): void
    {
        //
    }

    /**
     * Handle the Transactions "deleted" event.
     */
    public function deleted(Transactions $transactions): void
    {
        //
    }

    /**
     * Handle the Transactions "restored" event.
     */
    public function restored(Transactions $transactions): void
    {
        //
    }

    /**
     * Handle the Transactions "force deleted" event.
     */
    public function forceDeleted(Transactions $transactions): void
    {
        //
    }
}
