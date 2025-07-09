<?php

namespace App\Enums;

enum FinePaymentStatus: string
{
    case CASH = 'CASH';
    case TRANSFER = 'TRANSFER';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->value,
        ])->values()->toArray();
    }
}
