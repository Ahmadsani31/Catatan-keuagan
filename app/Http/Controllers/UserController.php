<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {

        return Inertia::render('master/user/index', [
            'users' => UserResource::collection(User::latest()->get()),
            'title' => 'User',
        ]);
    }

    public function create()
    {
        return Inertia::render('master/user/create', [
            'title' => 'Buat User',
        ]);
    }

    public function store(UserRequest $request)
    {
        try {
            User::create($request->validated());
            return to_route('master.user.index')->with(['type' => 'success', 'message' => 'Tambah Successfully']);
        } catch (\Exception $err) {
            return back()->with(['status' => 'error', 'message', $err->getMessage()]);
        }
    }

    public function update(UserRequest $request, User $user)
    {
        try {
            $user->update($request->validated());
            return to_route('master.user.index')->with(['type' => 'success', 'message' => 'Update Successfully']);
        } catch (\Exception $err) {
            return back()->with(['status' => 'error', 'message', $err->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $query = User::findOrFail($id);
            $query->delete();
            return to_route('user.index')->with(['status' => false, 'message' => 'Successfully']);
        } catch (\Exception $err) {
            return back()->with(['status' => false, 'message', $err->getMessage()]);
        }
    }
}
