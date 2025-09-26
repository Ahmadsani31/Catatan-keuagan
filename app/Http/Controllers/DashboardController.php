<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\PaymentKreditur;
use App\Models\Transactions;
use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {

        $month = (int) ($request->input('bulan') ?? now()->month);
        $orgId = getOrganizationiId(); // tetap pakai helper Anda

        // Ringkas: total transaksi per tipe (Pemasukan/Pengeluaran) di bulan tsb
        $perType = Transactions::select('type', DB::raw('SUM(amount) as total_amount'))
            ->whereHas('organization', fn($q) => $q->whereKey($orgId))
            ->whereMonth('created_at', $month)
            ->groupBy('type')
            ->pluck('total_amount', 'type'); // Collection keyed by type

        // Total pembayaran kreditur (profit?) di bulan tsb
        $profit = PaymentKreditur::whereHas('kreditur.organization', fn($q) => $q->whereKey($orgId))
            ->whereMonth('created_at', $month)
            ->sum('amount');

        // 5 transaksi terakhir (dibatasi organisasi yang sama biar konsisten)
        $latestTransaksi = Transactions::whereHas('organization', fn($q) => $q->whereKey($orgId))
            ->whereMonth('created_at', $month)
            ->latest()
            ->limit(5)
            ->get();

        // Opsional: filter tipe transaksi, contoh hanya "Pengeluaran"
        $type  = $request->input('type', 'Pemasukan'); // "Pemasukan" / "Pengeluaran" / null

        $end   = Carbon::now();                          // hari ini
        $start = Carbon::now()->subMonths(6)->startOfMonth(); // 6 bulan ke belakang, dari awal bulan


        $rows = Transactions::select('category_id', DB::raw('SUM(amount) as amount'))
            ->with(['category:id,name'])
            ->when($type, fn($q) => $q->where('type', $type))
            ->whereHas('organization', fn($q) => $q->whereKey($orgId))
            ->whereBetween('created_at', [$start, $end]) // filter range 6 bulan terakhir
            ->groupBy('category_id')
            ->get()
            ->map(function ($r) {
                return [
                    'id' => $r->category->name ?? 'Tanpa Kategori',
                    'label' => $r->category->name ?? 'Tanpa Kategori',
                    'value'   => (float) ($r->amount ?? 0)
                ];
            })
            ->whenEmpty(fn($c) => collect([[
                'id'    => 'Tanpa Kategori',
                'label' => 'Tanpa Kategori',
                'value' => 0,
            ]]))
            ->values();

        // dd($payment_krediturs[0]['total_amount']);
        return Inertia::render('dashboard', [
            'page_data' => [
                'income'         => (int) ($perType->get('Pemasukan', 0)),
                'expense'        => (int) ($perType->get('Pengeluaran', 0)),
                'profit'         => (int) $profit,
                'last_transaksi' => TransactionResource::collection($latestTransaksi),

            ],
            'pie_transaksi' => $rows
        ]);
    }
}
