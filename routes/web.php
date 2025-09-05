<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KrediturController;
use App\Http\Controllers\OrganizationsController;
use App\Http\Controllers\PaymentKrediturController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Mail\SendEmail;
use App\Models\Category;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::controller(DashboardController::class)->group(function () {
        Route::get('dashboard', 'index')->name('dashboard');
    });

    Route::prefix('master')->group(function () {

        Route::controller(UserController::class)->group(function () {
            Route::get('users', 'index')->name('master.users.index');
            Route::get('users/create', 'create')->name('master.users.create');
            Route::post('users/store', 'store')->name('master.users.store');
            Route::get('users/edit/{user}', 'edit')->name('master.users.edit');
            Route::put('users/update/{user}', 'update')->name('master.users.update');
            Route::put('users/update-password/{user}', 'update_password')->name('master.users.update-password');
            Route::delete('users/destroy/{user}', 'destroy')->name('master.users.destroy');

            Route::get('users/assign-role', 'assignRole')->name('master.users.assign-role');
            Route::post('users/store/assign-role', 'storeAssignRole')->name('master.users.store-assign-role');
        });


        Route::controller(RolesController::class)->group(function () {
            Route::get('/roles', 'index')->name('roles.index');
            Route::get('/roles/create', 'create')->name('roles.create');
            Route::get('/roles/edit/{id}', 'edit')->name('roles.edit');
            Route::post('/roles/store', 'store')->name('roles.store');
            Route::put('/roles/update', 'update')->name('roles.update');
            Route::delete('/roles/delete/{id}', 'destroy')->name('roles.delete');

            Route::get('/roles/all', 'allRoles')->name('roles.all');
            Route::post('/roles/assign-permissions', 'assign')->name('roles.assign-permissions');
        });

        Route::apiResource('permission', PermissionController::class);

        Route::controller(CategoryController::class)->group(function () {
            Route::get('categories', 'index')->name('master.categories.index');
            Route::post('categories/store', 'store')->name('master.categories.store');
            Route::put('categories/update/{category}', 'update')->name('master.categories.update');
            Route::delete('categories/destroy/{category}', 'destroy')->name('master.categories.destroy');

            Route::get('categories/create', 'create_json')->name('master.categories.create');
            Route::get('categories/edit/{category}', 'edit_json')->name('master.categories.edit');
        });
    });

    Route::controller(TransactionController::class)->group(function () {
        Route::get('/transactions', 'index')->name('transactions.index');
        Route::get('/transactions/create', 'create')->name('transactions.create');

        Route::get('/transactions/edit/{transaction}', 'edit')->name('transactions.edit');

        Route::post('/transactions/store', 'store')->name('transactions.store');
        Route::put('/transactions/update/{transaction}', 'update')->name('transactions.update');

        Route::delete('/transactions/destroy/{transaction}', 'destroy')->name('transactions.destroy');

        Route::get('/transactions/type/{type}', 'type_json')->name('transactions.type');

        Route::get('/laporan/transactions', 'laporan')->name('transactions.laporan');
    });


    Route::controller(KrediturController::class)->group(function () {
        Route::get('/krediturs', 'index')->name('krediturs.index');
        Route::get('/krediturs/create', 'create')->name('krediturs.create');
        Route::post('/krediturs/store', 'store')->name('krediturs.store');

        Route::get('/krediturs/edit/{kreditur}', 'edit')->name('krediturs.edit');
        Route::put('/krediturs/update/{kreditur}', 'update')->name('krediturs.update');
        Route::delete('/krediturs/delete/{kreditur}', 'destroy')->name('krediturs.destroy');
    });

    Route::controller(PaymentKrediturController::class)->group(function () {
        Route::get('/krediturs/payment/{kreditur:slug}', 'index')->name('krediturs.payment.index');
        Route::post('/krediturs/payment/store/{kreditur}', 'store')->name('krediturs.payment.store');
        Route::delete('/krediturs/payment/delete/{kreditur}/{paymentKreditur}', 'destroy')->name('krediturs.payment.destroy');
    });
});

// Route::get('/email-test', function () {

//     $data = [
//         'name' => 'John Doe',
//         'message' => 'This is a test email from Laravel 12.'
//     ];

//     Mail::to('ahmaddarma0@gmail.com')->send(new SendEmail($data));

//     return response()->json(['success' => 'Email sent successfully.']);
// });


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
