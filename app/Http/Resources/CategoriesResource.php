<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoriesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'type' => $this->type,
            'organization_id' => $this->organization_id,
            'organization'    => [
                'id'   => $this->organization?->id,
                'name' => $this->organization?->name,
            ],
        ];
    }
}
