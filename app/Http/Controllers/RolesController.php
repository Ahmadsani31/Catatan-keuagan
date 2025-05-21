<?php

namespace App\Http\Controllers;

use App\Http\Requests\RolesRequest;
use App\Http\Resources\RolesResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index()
    {
        $role = Role::paginate(10);
        return Inertia::render('master/rolesIndex', [
            'role' => RolesResource::collection($role),
            'title' => 'Roles'
        ]);
    }

    public function create($id)
    {
        $role = [];
        if ($id != 0) {
            $param = Role::findById(Crypt::decrypt($id));
            $role = new RolesResource($param);
        }
        return Inertia::render('master/rolesCreate', [
            'title' => 'Roles Create',
            'role' => $role,
        ]);
    }

    public function store(RolesRequest $request)
    {
        if ($request->id == 0) {
            Role::create($request->validated());
        } else {
            $param = Role::findById(Crypt::decrypt($request->id));
            $param->name = $request->name;
            $param->save();
        }

        return to_route('roles.index');
    }
}
