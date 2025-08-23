<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Category;
use App\Models\Transactions;
use App\Traits\HasFile;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    use HasFile;

    public function index(): Response
    {

        // $organization = Auth::user()->organizations()->first();

        // $users = User::whereHas('organizations', function ($q) use ($organization) {
        //     $q->where('organizations.id', $organization->id)->where('users.id', '!=', auth()->user()->id);
        // })->latest()->get();



        return Inertia::render('transactions/index', [
            'transactions' => TransactionResource::collection(Transactions::where('organization_id', getOrganizationiId())->latest()->get()),
            'page_info' => [
                'title' => 'Transaksi',
                'subtitle' => 'Menampilkan semua data transaksi yang ada di platform ini, untuk di kelola',
            ],
            'page_data' => [
                'income' => Transactions::where([
                    'organization_id' => getOrganizationiId(),
                    'type' => 'Pemasukan'
                ])->sum('amount'),
                'expense' => Transactions::where([
                    'organization_id' => getOrganizationiId(),
                    'type' => 'Pengeluaran'
                ])->sum('amount'),
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

    public function store(TransactionRequest $request): RedirectResponse
    {
        // dd($request->validated());
        try {
            //code...
            Transactions::create([
                'user_id' => auth()->user()->id,
                'organization_id' => getOrganizationiId(),
                'category_id' => $request->category_id,
                'type' => $request->type,
                'amount' => $request->amount,
                'date' => $request->date,
                'description' => $request->description,
                'file_image' => $this->upload_file($request, 'file_image', 'transactions'),
            ]);

            return to_route('transactions.index')->with([
                'type' => 'success',
                'message' => 'Transaksi Successfully'
            ]);
        } catch (\Throwable $err) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }


    public function edit(Transactions $transaction): Response
    {

        return Inertia::render('transactions/edit', [
            'page_info' => [
                'title' => 'Edit Transaksi',
                'subtitle' => 'Edit transaksi yang ada disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('transactions.update', $transaction),
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
            'transactions' => new TransactionResource($transaction),
        ]);
    }


    public function update(Transactions $transaction, TransactionRequest $request)
    {
        // dd($transaction);
        try {
            $transaction->update([
                'category_id' => $request->category_id,
                'type' => $request->type,
                'amount' => $request->amount,
                'date' => $request->date,
                'description' => $request->description,
                'file_image' => $this->update_file($request, $transaction, 'file_image', 'transactions'),
            ]);

            return to_route('transactions.index')->with([
                'type' => 'success',
                'message' => 'Update Successfully'
            ]);
        } catch (\Throwable $err) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }

    public function destroy(Transactions $transaction)
    {
        try {
            $transaction->delete();
            $this->delete_file($transaction, 'file_image');
            return back()->with([
                'type' => 'success',
                'message' => 'Delete Successfully'
            ]);
        } catch (\Throwable $err) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }

    public function create_json()
    {
        return response()->json([
            'page_data' => [
                'categoryType' => Category::where(['organization_id' => getOrganizationiId(), 'type' => 'Pemasukan'])->get()
                    ->map(fn($item) => [
                        'value' => $item->id,
                        'label' => $item->name,
                    ]),
            ],
        ]);
    }

    public function edit_json(Transactions $transactions, string $type)
    {
        return response()->json([
            'transactions' => $transactions,
            'page_data' => [
                'categoryType' => Category::where(['organization_id' => getOrganizationiId(), 'type' => 'Pemasukan'])->get()
                    ->map(fn($item) => [
                        'value' => $item->id,
                        'label' => $item->name,
                    ]),
            ],
        ]);
    }

    public function type_json($type)
    {
        return response()->json([
            'categoryType' => Category::where(['organization_id' => getOrganizationiId(), 'type' => $type])->get()
                ->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
        ]);
    }
}
