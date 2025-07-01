<?php

namespace App\Http\Controllers;

use App\Enums\OrganizationsStatus;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdatePasswordRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(): Response
    {

        $organization = Auth::user()->organizations()->first();

        $users = User::whereHas('organizations', function ($q) use ($organization) {
            $q->where('organizations.id', $organization->id)->where('users.id', '!=', auth()->user()->id);
        })->latest()->get();

        return Inertia::render('master/user/index', [
            'users' => UserResource::collection($users),
            'page_info' => [
                'title' => 'User',
                'subtitle' => 'Menampilkan semua data user yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }

    public function create(): Response
    {
        // $auth = Auth::user()->organizations()->first();

        // dd($auth->name);
        return Inertia::render('master/user/create', [
            'page_info' => [
                'title' => 'Buat User',
                'subtitle' => 'Buat data user baru, klik simpan jika sudah selesai',
                'method' => 'POST',
                'action' => route('master.users.store'),
            ],
            'page_data' => [
                'roles' => Role::select('id', 'name')->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            ]
        ]);
    }


    public function edit(User $user): Response
    {
        return Inertia::render('master/user/edit', [
            'users' => new UserResource($user->load(['roles'])),
            'page_info' => [
                'title' => 'Buat User',
                'subtitle' => 'Buat data user baru, klik simpan jika sudah selesai',
                'method' => 'PUT',
                'action' => route('master.users.update', $user),
            ],
            'page_data' => [
                'roles' => Role::select('id', 'name')->get()->map(fn($item) => [
                    'value' => $item->name,
                    'label' => $item->name,
                ]),
            ]
        ]);
    }


    public function store(UserRequest $request)
    {

        DB::beginTransaction();

        try {
            $user =  User::create($request->validated());

            $organization = Auth::user()->organizations()->first();

            $organization->users()->attach($user->id);
            $user->assignRole($request->roles);
            DB::commit();

            return to_route('master.users.index')->with([
                'type' => 'success',
                'message' => 'Tambah Successfully'
            ]);
        } catch (\Exception $err) {
            DB::rollBack();
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }

    public function update(UserRequest $request, User $user)
    {
        try {
            $user->update($request->validated());

            if ($request->roles) {
                $user->syncRoles($request->roles);
            }

            return to_route('master.users.index')->with([
                'type' => 'success',
                'message' => 'Update Successfully'
            ]);
        } catch (\Exception $err) {
            return back()->with(['type' => 'error', 'message' => $err->getMessage()]);
        }
    }

    public function update_password(UserUpdatePasswordRequest $request, User $user)
    {
        try {
            $user->update($request->validated());
            return back()->with([
                'type' => 'success',
                'message' => 'Update password ' . $user->name . ' successfully'
            ]);
        } catch (\Exception $err) {
            return back()->with(['type' => 'error', 'message' => $err->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $query = User::findOrFail($id);
            $query->delete();
            return back()->with(['type' => 'success', 'message' => 'Delete ' . $query->name . ' successfully']);
        } catch (\Exception $err) {
            return back()->with(['type' => 'error', 'message', $err->getMessage()]);
        }
    }
}
