<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => [
                Rule::when($this->routeIs('master.user.store'), [
                    'required',
                    'email',
                    'unique:users,email'
                ]),
                Rule::when($this->routeIs('master.user.update'), [
                    'nullable',
                    'email',
                    'unique:users,email'
                ]),
            ],
            'password' => [
                Rule::when($this->routeIs('master.user.store'), [
                    'required',
                    'min:6',
                    'max:255',
                    'confirmed'
                ]),
                Rule::when($this->routeIs('master.user.update'), [
                    'nullable',
                    'min:6',
                    'max:255',
                    'confirmed'
                ]),
            ],
        ];
    }
}
