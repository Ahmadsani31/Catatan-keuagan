<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionChartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'       => $this->id,
            'category' => $this->category?->name,
            'type'     => $this->type,
            'amount'   => $this->amount,
            'date'     => $this->date->toFormattedDateString(),
            'created_at' => $this->created_at->format('Y-m-d H:i')
        ];
    }
}
