<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\KrediturController;
use App\Http\Controllers\OrganizationsController;
use App\Http\Controllers\PaymentKrediturController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('master')->group(function () {

        Route::controller(UserController::class)->group(function () {
            Route::get('users', 'index')->name('master.users.index');
            Route::get('users/create', 'create')->name('master.users.create');
            Route::post('users/store', 'store')->name('master.users.store');
            Route::get('users/edit/{user}', 'edit')->name('master.users.edit');
            Route::put('users/update/{user}', 'update')->name('master.users.update');
            Route::put('users/update-password/{user}', 'update_password')->name('master.users.update-password');
            Route::delete('users/destroy/{user}', 'destroy')->name('master.users.destroy');
        });


        Route::controller(RolesController::class)->group(function () {
            Route::get('/roles', 'index')->name('roles.index');
            Route::get('/roles/create', 'create')->name('roles.create');
            Route::get('/roles/edit/{id}', 'edit')->name('roles.edit');
            Route::post('/roles/store', 'store')->name('roles.store');
            Route::put('/roles/update', 'update')->name('roles.update');
            Route::delete('/roles/delete/{id}', 'destroy')->name('roles.delete');
        });

        Route::apiResource('permission', PermissionController::class);

        Route::controller(CategoryController::class)->group(function () {
            Route::get('categories', 'index')->name('master.categories.index');
            // Route::get('categories/create', 'create')->name('master.categories.create');
            Route::post('categories/store', 'store')->name('master.categories.store');
            // Route::get('categories/edit/{category}', 'edit')->name('master.categories.edit');
            Route::put('categories/update/{category}', 'update')->name('master.categories.update');
            Route::delete('categories/destroy/{category}', 'destroy')->name('master.categories.destroy');

            Route::get('categories/create', 'create_json')->name('master.categories.create');
            Route::get('categories/edit/{category}', 'edit_json')->name('master.categories.edit');
        });



        // Route::get('/permission', [PermissionController::class, 'index']);


        // Route::apiResource('permission', [PermissionController::class, 'index', 'store', 'show', 'update', 'destroy'])
        //     ->only(['index', 'store', 'show', 'update', 'destroy'])
        //     ->names([
        //         'index' => 'permission.index',
        //         'store' => 'permission.store',
        //         'show' => 'permission.show',
        //         'update' => 'permission.update',
        //         'destroy' => 'permission.destroy'
        //     ]);
        // Route::get('/permission/create/{id}', [PermissionController::class, 'create'])->name('permission.create');
        // Route::post('/permission/store', [PermissionController::class, 'store'])->name('permission.store');
        // Route::delete('/permission/delete/{id}', [PermissionController::class, 'destroy'])->name('permission.delete');

    });

    Route::controller(TransactionController::class)->group(function () {
        Route::get('/transactions', 'index')->name('transactions.index');
        Route::get('/transactions/create', 'create')->name('transactions.create');

        Route::get('/transactions/edit/{transaction}', 'edit')->name('transactions.edit');

        Route::post('/transactions/store', 'store')->name('transactions.store');
        Route::put('/transactions/update/{transaction}', 'update')->name('transactions.update');

        Route::delete('/transactions/destroy/{transaction}', 'destroy')->name('transactions.destroy');

        Route::get('/transactions/type/{type}', 'type_json')->name('transactions.type');
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
        Route::get('/payment-krediturs/{kreditur:slug}', 'index')->name('payment-krediturs.index');
        Route::get('/payment-krediturs/create', 'create')->name('payment-krediturs.create');
        Route::post('/payment-krediturs/store/{kreditur}', 'store')->name('payment-krediturs.store');
        Route::get('/payment-krediturs/edit/{paymentKreditur}', 'edit')->name('payment-krediturs.edit');
        Route::put('/payment-krediturs/update/{paymentKreditur}', 'update')->name('payment-krediturs.update');
        Route::delete('/payment-krediturs/delete/{kreditur}/{paymentKreditur}', 'destroy')->name('payment-krediturs.destroy');
    });

    // Route::controller(OrganizationsController::class)->group(function () {
    //     Route::get('organizations', 'index')->name('organizations.index');
    // });


    // Route::get('organizations', [OrganizationsController::class, 'index']);
    // Route::get('organizations/create/{id}', [OrganizationsController::class, 'create'])->name('organizations.create');
    // Route::get('organizations/{id}/detail', [OrganizationsController::class, 'detail'])->name('organizations.detail');
    // Route::get('categorys', [CategoriesController::class, 'index'])->name('categorys.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
