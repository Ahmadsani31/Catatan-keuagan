<?php

namespace App\Http\Controllers;

use App\Http\Requests\RolesRequest;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RolesResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index()
    {
        return Inertia::render('master/role/index', [
            'roles' => RolesResource::collection(Role::all()),
            'page_info' => [
                'title' => 'Roles',
                'subtitle' => 'Menampilkan semua data roles yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }

    public function edit($id)
    {
        $role = Role::findById(Crypt::decrypt($id));

        return Inertia::render('master/role/edit', [
            'role' => new RolesResource($role),
            'title' => 'Roles Edit',
            'permissions' => PermissionResource::collection(Permission::latest()->get()),
            'page_info' => [
                'title' => 'Roles Edit',
                'subtitle' => 'Menampilkan semua data roles yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }


    public function create()
    {
        return Inertia::render('master/role/create', [
            'permissions' =>  PermissionResource::collection(Permission::all()),
            'page_info' => [
                'title' => 'Buat Roles',
                'subtitle' => 'Menampilkan semua data buat roles yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }

    public function store(RolesRequest $request)
    {
        $role = Role::create($request->validated());
        $role->givePermissionTo($request->permission);

        return to_route('roles.index')->with('message', 'Roles berhasil disimpan!');
    }

    public function update(Request $request)
    {
        $role = Role::findById($request->id);
        $role->name = $request->name;
        $role->save();
        $role->syncPermissions($request->permission);

        return to_route('roles.index')->with('message', 'Roles berhasil disimpan!');
    }

    public function destroy($id)
    {
        $param = Role::findById(Crypt::decrypt($id));
        $param->delete();
        return to_route('roles.index')->with('message', 'Delete berhasil!');
    }
}
