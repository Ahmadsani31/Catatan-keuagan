<?php

namespace App\Enums;

enum CategoryType: string
{
    case INCOME = 'Pemasukan';
    case EXPENSE = 'Pengeluaran';
    case DEBT = 'Hutang';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}
