<?php

namespace App\Http\Controllers;

use App\Enums\OrganizationsStatus;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdatePasswordRequest;
use App\Http\Resources\UserResource;
use App\Mail\SendEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(): Response
    {

        $organization = Auth::user()->organizations()->first();

        $users = User::whereHas('organizations', function ($q) use ($organization) {
            $q->where('organizations.id', $organization->id)->where('users.id', '!=', Auth::user()->id);
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

    public function assignRole(): Response
    {

        return Inertia::render('master/user/assign-role', [
            'page_info' => [
                'title' => 'Terapkan Role ke User',
                'subtitle' => 'Buat data user baru, klik simpan jika sudah selesai',
                'method' => 'POST',
                'action' => route('master.users.store-assign-role'),
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

            $data = [
                'title' => 'Undangan Bergabung di Aplikasi KeuanganKu',
                'name' => $user->name,
                'message' => 'Kamu di undang untuk bergabung di aplikasi ' . env('APP_NAME', 'KeuanganKu') . ' dengan organisasi ' . $organization->name . ', silahkan login menggunakan email dan password yang sudah di buat. dan aktifkan segera akun kamu.',
                'email' => $user->email,
                'password' => $request->password,
                'url' => env('APP_URL') . '/login',
                'appName' => env('APP_NAME', 'KeuanganKu'),
            ];

            Mail::to($user->email)->send(new SendEmail($data));

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

    public function storeAssignRole(Request $request)
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
