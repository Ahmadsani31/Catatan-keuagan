<?php

namespace App\Http\Controllers\Auth;

use App\Enums\OrganizationsStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRegisterRequest;
use App\Models\Organizations;
use App\Models\OrganizationUser;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(UserRegisterRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $organization = Organizations::create([
                'name' => $name = $request->organization,
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'address' => $request->address,
                'keterangan' => $request->keterangan,
            ]);

            $organization->users()->attach($user->id);
            $user->assignRole('Admin');
            DB::commit();

            event(new Registered($user));

            Auth::login($user);

            return to_route('dashboard');
        } catch (\Throwable $err) {
            DB::rollBack();
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }
}
