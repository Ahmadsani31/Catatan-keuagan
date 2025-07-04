<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
            'page_data' => [
                'categoryIncome' => Category::where('type', 'Pemasukan')->get()->map(fn($item) => [
                    'value' => $item->name,
                    'label' => $item->name,
                ]),
                'categoryExpense' => Category::where('type', 'Pengeluaran')->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('transactions/create', [
            'page_info' => [
                'title' => 'Tambah Transaksi',
                'subtitle' => 'Buat transaksi baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('transactions.store'),
            ],
            'page_data' => [
                'categoryIncome' => Category::where('type', 'Pemasukan')->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
                'categoryExpense' => Category::where('type', 'Pengeluaran')->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            ],
        ]);
    }
}
