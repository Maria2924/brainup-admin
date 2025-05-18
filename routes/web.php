<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\RoleMiddleware;

//Admin Routes
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;

//Instructor Routes
use App\Http\Controllers\Instructor\InstructorDashboardController;
use App\Http\Controllers\Instructor\InstructorProfileController;

Route::get('/', function () {   
    return Inertia::render('welcome');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('auth/register');
})->name('register');

Route::middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('courses')->group(function () {
        Route::get('/', [CourseController::class, 'index'])->name('courses.index');
        Route::post('/store', [CourseController::class, 'store'])->name('courses.store');
        Route::patch('/update/{course}', [CourseController::class, 'update'])->name('courses.update');
        Route::delete('/destroy/{course}', [CourseController::class, 'destroy'])->name('courses.destroy');
    });

    Route::prefix('instructors')->group(function () {
        Route::get('/', [InstructorDashboardController::class, 'index'])->name('instructors.index');
        Route::post('/store', [InstructorDashboardController::class, 'store'])->name('instructors.store');
        Route::patch('/update/{instructor}', [InstructorDashboardController::class, 'update'])->name('instructors.update');
        Route::delete('/destroy/{instructor}', [InstructorDashboardController::class, 'destroy'])->name('instructors.destroy');
    });

    Route::prefix('students')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('students.index');
        Route::post('/store', [StudentController::class, 'store'])->name('students.store');
        Route::patch('/update/{student}', [StudentController::class, 'update'])->name('students.update');
        Route::delete('/destroy/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
    });

});

Route::middleware(['auth', 'verified', RoleMiddleware::class . ':instructor'])->group(function () {
    // Instructor Dashboard Routes
    Route::prefix('instructor')->group(function () {
        Route::get('/dashboard', [InstructorDashboardController::class, 'index'])->name('instructor.dashboard');
        Route::get('/profile', [InstructorProfileController::class, 'index'])->name('instructor.profile');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
