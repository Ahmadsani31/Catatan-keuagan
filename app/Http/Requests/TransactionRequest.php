<?php

namespace App\Http\Requests;

use App\Enums\CategoryType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class TransactionRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['required'],
            'type' => ['required', new Enum(CategoryType::class)],
            'date' => ['required', 'date'],
            'amount' => ['required'],
            'file_image' =>  ['nullable', 'mimes:png,jpg,webp', 'max:2048'],
            'description' => ['required']
        ];
    }

    public function attributes(): array
    {
        return [
            'category_id' => 'Kategori',
            'type' => 'Type',
            'date' => 'Tanggal',
            'amount' => 'Harga',
            'file_image' => 'Gambar',
            'description' => 'Keterangan',
        ];
    }
}
