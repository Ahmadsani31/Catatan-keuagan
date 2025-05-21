<?php

namespace Database\Seeders;

use App\Models\Categories;
use App\Models\Organizations;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SampleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Organizations::create([
        //     'name' => 'Keluarga Sani',
        //     'type' => 'perusahaan',
        //     'keterangan' => 'catatan keuangan keluarga sani',
        //     'owner_id' => 1,
        // ]);

        for ($i = 1; $i < 50; $i++) {
            Categories::create([
                'organization_id' => 1,
                'name' => fake()->name(),
                'type' => 'income',
            ]);
        }
    }
}
