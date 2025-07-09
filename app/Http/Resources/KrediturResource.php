<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KrediturResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'address' => $this->address,
            'slug' => $this->slug,
            'status' => $this->status,
            'date' => $this->date,
            'note' => $this->note,
            'created_at' => $this->created_at->format('d M Y'),
            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ],
            'cash' => [
                'amount' => $this->cash?->amount,
                'available' => $this->cash?->available,
                'pay' => $this->cash?->pay,
            ],
        ];
    }
}
