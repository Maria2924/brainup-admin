<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\InstructorsController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {   
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
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
        Route::get('/', [InstructorsController::class, 'index'])->name('instructors.index');
        Route::post('/store', [InstructorsController::class, 'store'])->name('instructors.store');
        Route::patch('/update/{instructor}', [InstructorsController::class, 'update'])->name('instructors.update');
        Route::delete('/destroy/{instructor}', [InstructorsController::class, 'destroy'])->name('instructors.destroy');
    });

    Route::prefix('students')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('students.index');
        Route::post('/store', [StudentController::class, 'store'])->name('students.store');
        Route::patch('/update/{student}', [StudentController::class, 'update'])->name('students.update');
        Route::delete('/destroy/{student}', [StudentController::class, 'destroy'])->name('students.destroy');
    });

 
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
