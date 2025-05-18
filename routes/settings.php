<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Instructor\InstructorProfileController;
use App\Http\Controllers\Instructor\InstructorPasswordController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\RoleMiddleware;

Route::middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});

Route::middleware(['auth', 'verified', RoleMiddleware::class . ':instructor'])->group(function () {
    Route::redirect('instructor/settings', 'instructor/settings/profile');

    Route::get('instructor/settings/profile', [InstructorProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('instructor/settings/profile', [InstructorProfileController::class, 'update'])->name('profile.update');
    Route::delete('instructor/settings/profile', [InstructorProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('instructor/settings/password', [InstructorPasswordController::class, 'edit'])->name('password.edit');
    Route::put('instructor/settings/password', [InstructorPasswordController::class, 'update'])->name('password.update');

    Route::get('instructor/settings/appearance', function () {
        return Inertia::render('user_dashboards/Instructors/profile/appearance');
    })->name('instructor.appearance');
});

