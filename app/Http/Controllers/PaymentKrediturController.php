<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentKrediturRequest;
use App\Http\Resources\PaymentKrediturResource;
use App\Models\Kreditur;
use App\Models\PaymentKreditur;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentKrediturController extends Controller
{
    use HasFile;

    public function index(Kreditur $kreditur)
    {

        return Inertia::render('payment-krediturs/index', [
            'page_info' => [
                'title' => 'Transaksi pembayaran',
                'subtitle' => 'Data transaksi pembayaran kredit ' . $kreditur->name . '.',
            ],
            'kreditur' => $kreditur->load('cash'),
            'paymentKreditur' => PaymentKrediturResource::collection($kreditur->paymentKreditur),
        ]);
    }

    public function store(PaymentKrediturRequest $request, Kreditur $kreditur): RedirectResponse
    {
        // dd($request->all());
        try {
            $kreditur->paymentKreditur()->create([
                'date' => $request->date,
                'amount' => $request->amount,
                'payment_method' => $request->payment_method,
                'note' => $request->note,
                'file_image' => $this->upload_file($request, 'file_image', 'krediturs'),
            ]);

            $kreditur->cash->update([
                'available' => $kreditur->cash->available - $request->amount,
                'pay' => $kreditur->cash->pay + $request->amount,
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Transaksi pembayaran successfully'
            ]);
        } catch (\Throwable $err) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }

    // public function update(Kreditur $kreditur, PaymentKreditur $paymentKreditur,  PaymentKrediturRequest $request)
    // {
    //     try {
    //         $paymentKreditur->update([
    //             'date' => $request->date,
    //             'amount' => $request->amount,
    //             'payment_method' => $request->payment_method,
    //             'note' => $request->note,
    //         ]);

    //         if ($paymentKreditur->amount != $request->amount) {
    //             $sisa = $paymentKreditur->amount
    //             $kreditur->cash->update([
    //                 'available' => $kreditur->cash->available + $request->amount,
    //                 'pay' => $kreditur->cash->pay - $request->amount,
    //             ]);
    //         }

    //         return back()->with([
    //             'type' => 'success',
    //             'message' => 'Update Successfully'
    //         ]);
    //     } catch (\Throwable $err) {
    //         return back()->with([
    //             'type' => 'error',
    //             'message' => $err->getMessage()
    //         ]);
    //     }
    // }

    public function destroy(Kreditur $kreditur, PaymentKreditur $paymentKreditur)
    {
        try {
            $kreditur->cash->update([
                'available' => $kreditur->cash->available + $paymentKreditur->amount,
                'pay' => $kreditur->cash->pay - $paymentKreditur->amount,
            ]);
            $paymentKreditur->delete();
            $this->delete_file($kreditur, 'file_image');
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
