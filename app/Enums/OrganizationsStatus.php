<?php

namespace App\Enums;

enum OrganizationsStatus: string
{
    case OWNER = 'Pemilik';
    case EDITOR = 'Editor';
    case VIEWER = 'Lihat';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name
        ])->values()->toArray();
    }
}
