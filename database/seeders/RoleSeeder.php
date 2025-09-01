<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'Admin']);
        $admin->syncPermissions([
            'dashboard_access',
            'category_access',
            'user_access',
            'roles_access',
            'permission_access',
            'transactions_access',
            'krediturs_access',
            'laporan_transactions_access',
        ]);

        $editor = Role::create(['name' => 'Editor']);
        $editor->syncPermissions([
            'dashboard_access',
            'category_access',
            'transactions_access',
            'krediturs_access',
            'laporan_transactions_access',
        ]);
    }
}
