<?php

namespace App\Http\Requests;

use App\Enums\BankStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rule;

class BankRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'alias' => ['required', 'string', 'min:3', 'max:255'],
            'account_number' => ['nullable', 'integer'],
            'status' => [
                Rule::when($this->routeIs('master.bank.store'), [
                    'nullable',
                    new Enum(BankStatus::class)
                ]),
                Rule::when($this->routeIs('master.bank.update'), [
                    'required',
                    new Enum(BankStatus::class)
                ])
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama',
            'alias' => 'Singkatan / Alias',
            'account_number' => 'Nomor akun',
            'status' => 'Status',
        ];
    }
}
