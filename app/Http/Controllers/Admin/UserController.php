<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {

        return Inertia::render('master/user/index', [
            'users' => UserResource::collection(User::latest()->get()),
            'title' => 'User',
        ]);
    }
}
