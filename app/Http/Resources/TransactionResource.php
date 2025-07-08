<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'category' => $this->whenLoaded('category', [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ]),
            'type'            => $this->type,
            'amount' => $this->amount,
            'date' => $this->date->format('d M Y'),
            'description' => $this->description,
            'user_id' => $this->user_id,
            'file_image' => $this->file_image ? Storage::url($this->file_image) : null,
            'created_at' => $this->created_at->format('Y-m-d H:i')
        ];
    }
}
