<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PaymentKrediturResource extends JsonResource
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
            'amount' => $this->amount,
            'payment_method' => $this->payment_method,
            'note' => $this->note,
            'date' => $this->date->toFormattedDateString(),
            'file_image' => $this->file_image ? Storage::url($this->file_image) : null,
            'kreditur' => $this->whenLoaded('kreditur', [
                'id' => $this->kreditur?->id,
                'name' => $this->kreditur?->name,
                'slug' => $this->kreditur?->slug,
            ]),
        ];
    }
}
