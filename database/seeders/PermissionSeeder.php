<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create([
            'dashboard_access',
            'category_access',
            'user_access',
            'roles_access',
            'permission_access',
            'transactions_access',
            'krediturs_access',
            'laporan_transactions_access',
        ]);
    }
}
