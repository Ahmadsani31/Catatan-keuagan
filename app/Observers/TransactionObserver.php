<?php

namespace App\Observers;

use App\Models\Bank;
use App\Models\Transactions;
use Illuminate\Support\Facades\DB;

class TransactionObserver
{
    /**
     * Handle the Transactions "created" event.
     */
    public function created(Transactions $transactions): void
    {
        DB::transaction(function () use ($transactions) {
            $bank = Bank::lockForUpdate()->find($transactions->bank_id);
            $bank->amount = bcadd((string)$bank->amount, $transactions->currentDelta(), 2);
            $bank->save();
        });
    }

    /**
     * Handle the Transactions "updated" event.
     */
    public function updated(Transactions $transactions): void
    {
        DB::transaction(function () use ($transactions) {
            $oldBankId = $transactions->getOriginal('bank_id');
            $newBankId = $transactions->bank_id;

            // 1) Revert dari kondisi lama
            $oldDelta = $transactions->originalDelta();
            $revert   = bcmul($oldDelta, '-1', 2); // kebalikan dari delta lama

            $oldBank = Bank::lockForUpdate()->find($oldBankId);
            $oldBank->amount = bcadd((string)$oldBank->amount, $revert, 2);
            $oldBank->save();

            // 2) Apply kondisi baru
            $newBank = Bank::lockForUpdate()->find($newBankId);
            $newBank->amount = bcadd((string)$newBank->amount, $transactions->currentDelta(), 2);
            $newBank->save();
        });
    }

    /**
     * Handle the Transactions "deleted" event.
     */
    public function deleted(Transactions $transactions): void
    {
        DB::transaction(function () use ($transactions) {
            $bank   = Bank::lockForUpdate()->find($transactions->bank_id);
            $revert = bcmul($transactions->currentDelta(), '-1', 2);
            $bank->amount = bcadd((string)$bank->amount, $revert, 2);
            $bank->save();
        });
    }

    /**
     * Handle the Transactions "restored" event.
     */
    public function restored(Transactions $transactions): void
    {
        DB::transaction(function () use ($transactions) {
            $bank = Bank::lockForUpdate()->find($transactions->bank_id);
            $bank->amount = bcadd((string)$bank->amount, $transactions->currentDelta(), 2);
            $bank->save();
        });
    }

    /**
     * Handle the Transactions "force deleted" event.
     */
    public function forceDeleted(Transactions $transactions): void
    {
        //
    }
}
