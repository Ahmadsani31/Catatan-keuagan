<?php

namespace App\Enums;

enum KreditursStatus: string
{
    case TERHUTANG = 'Terhutang';
    case LUNAS = 'Lunas';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}
