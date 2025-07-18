<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

class RolesResource extends JsonResource
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
            'name'            => $this->name,
            'encrypted_id' => Crypt::encrypt($this->id),
            'permissions' => $this->permissions->pluck('id'),
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i')
        ];
    }
}
