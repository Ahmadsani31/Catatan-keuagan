<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(15);
        return Inertia::render('master/userIndex', [
            'users' => $users,
            'title' => 'User'
        ]);
    }
}
