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
        Route::get('/user', [UserController::class, 'index']);

        Route::get('/roles', [RolesController::class, 'index'])->name('roles.index');
        Route::get('/roles/create/{id}', [RolesController::class, 'create'])->name('roles.create');
        Route::post('/roles/store', [RolesController::class, 'store'])->name('roles.store');

        Route::get('/permission', [PermissionController::class, 'index']);
    });

    Route::get('organizations', [OrganizationsController::class, 'index']);
    Route::get('organizations/create/{id}', [OrganizationsController::class, 'create'])->name('organizations.create');
    Route::get('organizations/{id}/detail', [OrganizationsController::class, 'detail'])->name('organizations.detail');
    Route::get('categories', [CategoriesController::class, 'index']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
