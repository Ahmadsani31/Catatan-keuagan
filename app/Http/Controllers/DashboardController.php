<?php

namespace App\Http\Controllers;

use App\Models\PaymentKreditur;
use App\Models\Transactions;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {

        // if ($request->bulan) {

        //     $query = Transactions::query();
        //     $query->select('type', DB::raw('SUM(amount) as total_amount'));
        //     $query->whereMonth('created_at', $request->input('bulan') ?? date('m'));
        //     $query->groupBy('type');
        //     $transactions =  $query->get()->toArray();

        //     dd($transactions);
        // }
        $query = Transactions::query();
        $query->select('type', DB::raw('SUM(amount) as total_amount'));
        $query->whereHas('organization', function (Builder $query) {
            $query->where('id', getOrganizationiId());
        });
        $query->whereMonth('created_at', $request->input('bulan') ?? date('m'));
        $query->groupBy('type');
        $transactions =  $query->get()->toArray();

        foreach ($transactions as $key => $value) {
            $transa[$value['type']] = (int) $value['total_amount'];
        }

        $query_payment = PaymentKreditur::query();
        $query_payment->select(DB::raw('SUM(amount) as total_amount'));
        $query_payment->whereHas('kreditur.organization', function (Builder $query) {
            $query->where('id', getOrganizationiId());
        });
        $query_payment->whereMonth('created_at', $request->input('bulan') ?? date('m'));
        $payment_krediturs =  $query_payment->get()->toArray();

        // dd($payment_krediturs[0]['total_amount']);
        return Inertia::render('dashboard', [
            'page_data' => [
                'income' => $transa['Pemasukan'] ?? 0,
                'expense' => $transa['Pengeluaran'] ?? 0,
                'profit' => $payment_krediturs[0]['total_amount'] ?? 0,
            ],
        ]);
    }
}
