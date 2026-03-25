<?php

use App\Http\Controllers\RouteController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [RouteController::class, 'Dashboard'])
        ->name('dashboard');
    Route::get('/notes', [RouteController::class, 'Notes'])
        ->name('notes');

});

require __DIR__.'/settings.php';
