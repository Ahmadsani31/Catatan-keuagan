<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\OrganizationsController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UserController;
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
        Route::get('/user', [UserController::class, 'index'])->name('master.user.index');
        Route::get('/user/create', [UserController::class, 'create'])->name('master.user.create');
        Route::post('/user/store', [UserController::class, 'store'])->name('master.user.store');
        Route::post('/user/{user}/update', [UserController::class, 'update'])->name('master.user.update');
        Route::delete('/user/delete/{id}', [UserController::class, 'destroy'])->name('user.delete');

        Route::get('/roles', [RolesController::class, 'index'])->name('roles.index');
        Route::get('/roles/create', [RolesController::class, 'create'])->name('roles.create');
        Route::get('/roles/edit/{id}', [RolesController::class, 'edit'])->name('roles.edit');
        Route::post('/roles/store', [RolesController::class, 'store'])->name('roles.store');
        Route::put('/roles/update', [RolesController::class, 'update'])->name('roles.update');
        Route::delete('/roles/delete/{id}', [RolesController::class, 'destroy'])->name('roles.delete');

        Route::get('/permission', [PermissionController::class, 'index']);

        Route::apiResource('permission', PermissionController::class);

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

    Route::get('organizations', [OrganizationsController::class, 'index']);
    Route::get('organizations/create/{id}', [OrganizationsController::class, 'create'])->name('organizations.create');
    Route::get('organizations/{id}/detail', [OrganizationsController::class, 'detail'])->name('organizations.detail');
    Route::get('categories', [CategoriesController::class, 'index']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
