<?php

namespace App\Enums;

enum BankStatus: string
{
    case ACTIVE = 'Aktif';
    case INACTIVE = 'Tidak Aktif';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}
