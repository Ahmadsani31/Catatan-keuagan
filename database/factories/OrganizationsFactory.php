<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Organizations>
 */
class OrganizationsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $name = fake()->name(),
            'slug' => Str::slug($name, '-'),
            'address' => fake()->address(),
            'keterangan' => fake()->text(),
        ];
    }
}
