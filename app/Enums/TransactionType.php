<?php

namespace App\Enums;

enum TransactionType: string
{
    case INCOME = 'Pemasukan';
    case EXPENSE = 'Pengeluaran';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}
