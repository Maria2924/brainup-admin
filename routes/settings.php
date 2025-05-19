<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Instructor\InstructorProfileController;
use App\Http\Controllers\Instructor\InstructorPasswordController;
use App\Http\Controllers\Student\StudentProfileController;
use App\Http\Controllers\Student\StudentPasswordController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\RoleMiddleware;

Route::middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('admin.profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('admin.profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('admin.password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('admin.password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('admin.appearance');
});

Route::middleware(['auth', 'verified', RoleMiddleware::class . ':instructor'])->group(function () {
    Route::redirect('instructor/settings', 'instructor/settings/profile');

    Route::get('instructor/settings/profile', [InstructorProfileController::class, 'edit'])->name('instructor.profile.edit');
    Route::patch('instructor/settings/profile', [InstructorProfileController::class, 'update'])->name('instructor.profile.update');
    Route::delete('instructor/settings/profile', [InstructorProfileController::class, 'destroy'])->name('instructor.profile.destroy');

    Route::get('instructor/settings/password', [InstructorPasswordController::class, 'edit'])->name('instructor.password.edit');
    Route::put('instructor/settings/password', [InstructorPasswordController::class, 'update'])->name('instructor.password.update');

    Route::get('instructor/settings/appearance', function () {
        return Inertia::render('user_dashboards/Instructors/profile/appearance');
    })->name('instructor.appearance');
});

Route::middleware(['auth', 'verified', RoleMiddleware::class . ':student'])->group(function () {
    Route::redirect('student/settings', 'student/settings/profile');

    Route::get('student/settings/profile', [StudentProfileController::class, 'edit'])->name('student.profile.edit');
    Route::patch('student/settings/profile', [StudentProfileController::class, 'update'])->name('student.profile.update');
    Route::delete('student/settings/profile', [StudentProfileController::class, 'destroy'])->name('student.profile.destroy');

    Route::get('student/settings/password', [StudentPasswordController::class, 'edit'])->name('student.password.edit');
    Route::put('student/settings/password', [StudentPasswordController::class, 'update'])->name('student.password.update');

    Route::get('student/settings/appearance', function () {
        return Inertia::render('user_dashboards/Students/profile/appearance');
    })->name('student.appearance');
});


