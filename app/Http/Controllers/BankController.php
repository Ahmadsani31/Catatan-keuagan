<?php

namespace App\Http\Controllers;

use App\Enums\BankStatus;
use App\Http\Requests\BankRequest;
use App\Http\Resources\BankResource;
use App\Models\Bank;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BankController extends Controller
{
    public function index(): Response
    {
        $banks = Bank::where('organization_id', getOrganizationiId())->latest()->get();

        return Inertia::render('master/bank/index', [
            'banks' => BankResource::collection($banks),
            'page_info' => [
                'title' => 'Bank',
                'subtitle' => 'Menampilkan semua data Bank yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }

    public function store(BankRequest $request): RedirectResponse
    {
        try {
            Bank::create([
                'organization_id' =>  getOrganizationiId(),
                'user_id' => Auth::user()->id,
                'name' =>  $request->name,
                'alias' => $request->alias,
                'account_number' => $request->account_number,
                'status' => BankStatus::ACTIVE->value,
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Tambah Successfully'
            ]);
        } catch (\Throwable $err) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }

    public function update(Bank $bank, BankRequest $request)
    {
        try {
            $bank->update([
                'name' =>  $request->name,
                'alias' => $request->alias,
                'account_number' => $request->account_number,
                'status' => $request->status,
            ]);

            return back()->with([
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
}
