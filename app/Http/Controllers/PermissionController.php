<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permission = Permission::paginate(10);
        return Inertia::render('master/permissionIndex', [
            'permission' => $permission,
            'title' => 'Permission'
        ]);
    }
}
