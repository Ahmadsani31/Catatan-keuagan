<?php

namespace App\Http\Controllers;

use App\Enums\CategoryType;
use App\Enums\KreditursStatus;
use App\Http\Requests\KrediturRequest;
use App\Http\Resources\KrediturResource;
use App\Http\Resources\PaymentKrediturResource;
use App\Models\Kreditur;
use App\Models\PaymentKreditur;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class KrediturController extends Controller
{
    public function index(): Response
    {
        $krediturs = Kreditur::where('organization_id', getOrganizationiId())->latest()->get();

        return Inertia::render('krediturs/index', [
            'krediturs' => KrediturResource::collection($krediturs),
            'page_info' => [
                'title' => 'Kreditur',
                'subtitle' => 'Menampilkan semua data kredit orang yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }


    public function create(): Response
    {
        return Inertia::render('krediturs/create', [
            'page_info' => [
                'title' => 'Tambah Kreditur / Peminjam',
                'subtitle' => 'Buat data kreditur / peminjam baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('krediturs.store'),
            ],
        ]);
    }

    public function store(KrediturRequest $request): RedirectResponse
    {
        // dd($request->all());
        try {
            Kreditur::create([
                'organization_id' => getOrganizationiId(),
                'user_id' => Auth::user()->id,
                'name' => $name = $request->name,
                'slug' => str()->lower(str()->slug($name) . str()->random(4)),
                'phone' => $request->phone,
                'address' => $request->address,
                'status' => KreditursStatus::TERHUTANG->value,
                'note' => $request->note,
                'date' => $request->date,
            ]);

            return to_route('krediturs.index')->with([
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

    public function edit(Kreditur $kreditur): Response
    {
        return Inertia::render('krediturs/edit', [
            'page_info' => [
                'title' => 'Edit Kategori',
                'subtitle' => 'Edit kategori baru disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('krediturs.update', $kreditur),
            ],
            'page_data' => [
                'categoryType' => CategoryType::options()
            ],
            'kreditur' => $kreditur->load('cash'),
        ]);
    }

    public function update(Kreditur $kreditur, KrediturRequest $request)
    {
        try {
            $kreditur->update([
                'name' =>  $request->name,
                'phone' => $request->phone,
                'address' => $request->address,
                'note' => $request->note,
                'date' => $request->date,
            ]);

            return to_route('krediturs.index')->with([
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


    public function transactions(Kreditur $kreditur)
    {

        return Inertia::render('krediturs/transactions', [
            'page_info' => [
                'title' => 'Transaksi pembayaran',
                'subtitle' => 'Data transaksi pembayaran kredit ' . $kreditur->name . '.',
            ],
            'kreditur' => $kreditur->load('cash'),
            'paymentKreditur' => PaymentKrediturResource::collection($kreditur->paymentKreditur),
        ]);
    }

    public function destroy(Kreditur $kreditur)
    {
        try {
            $kreditur->delete();
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
}
