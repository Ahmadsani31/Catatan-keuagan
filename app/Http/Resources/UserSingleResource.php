<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserSingleResource extends JsonResource
{
    public static $wrap = null; // menonaktifkan "data"
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
            'email' => $this->email,
            'phone' => $this->email,
            'avatar' => $this->avatar ? Storage::url($this->avatar) : null,
            'roles' => $this->getRoleNames(),
        ];
    }
}
