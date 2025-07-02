<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(): Response
    {

        // $organization = Auth::user()->organizations()->first();

        // $users = User::whereHas('organizations', function ($q) use ($organization) {
        //     $q->where('organizations.id', $organization->id)->where('users.id', '!=', auth()->user()->id);
        // })->latest()->get();

        return Inertia::render('transactions/index', [
            'page_info' => [
                'title' => 'Transaksi',
                'subtitle' => 'Menampilkan semua data transaksi yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }
}
