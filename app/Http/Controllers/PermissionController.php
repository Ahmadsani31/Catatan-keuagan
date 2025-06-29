<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use App\Http\Resources\PermissionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permission = Permission::all();

        return Inertia::render('master/permission/index', [
            'permission' => $permission,
            'title' => 'Permission',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PermissionRequest $request)
    {
        if ($request->id == 0) {
            Permission::create($request->only('name'));
        } else {
            $param = Permission::findById(Crypt::decrypt($request->id));
            $param->name = $request->name;
            $param->save();
        }

        return to_route('permission.index')->with('message', 'Permission berhasil disimpan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $param = Permission::findById($id);
        if ($param) {
            return response()->json([
                'status' => 'success',
                'data' => new PermissionResource($param),
            ]);
        }
        // exit();
        // $data = [];
        // if ($id != 0) {
        //     $param = Permission::findById(Crypt::decrypt($id));
        //     $data = new PermissionResource($param);
        // }

        // foreach (Role::all() as $val) {
        //     $roleData[] = [
        //         'value' => $val->id,
        //         'label' => $val->name,
        //     ];
        // }

        // return Inertia::render('master/permission/create', [
        //     'title' => 'Roles Create',
        //     'permission' => $data,
        //     'role' => $roleData,
        // ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $param = Permission::findById($id);
        $param->delete();
        return to_route('permission.index')->with('message', 'Permission berhasil delete!');
    }
}
