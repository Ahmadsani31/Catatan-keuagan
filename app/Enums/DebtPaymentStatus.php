<?php

namespace App\Enums;

enum DebtPaymentStatus: string
{
    case CASH = 'Cash';
    case TRANSFER = 'Transfer';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}
