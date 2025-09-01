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
        $admin = Role::firstOrCreate(['name' => 'admin']);
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

        $editor = Role::firstOrCreate(['name' => 'editor']);
        $editor->syncPermissions([
            'dashboard_access',
            'category_access',
            'transactions_access',
            'krediturs_access',
            'laporan_transactions_access',
        ]);
    }
}
