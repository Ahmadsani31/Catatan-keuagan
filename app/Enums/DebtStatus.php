<?php

namespace App\Enums;

enum DebtStatus: string
{
    case UNPAID = 'Hutang';
    case PARTIAL = 'Cicil';
    case PAID = 'Lunas';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}
