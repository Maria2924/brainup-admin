<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
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

    Route::prefix('subjects')->group(function () {
        Route::get('/', [SubjectController::class, 'index'])->name('subjects.index');
        Route::post('/store', [SubjectController::class, 'store'])->name('subjects.store');
        Route::patch('/update/{subject}', [SubjectController::class, 'update'])->name('subjects.update');
        Route::delete('/destroy/{subject}', [SubjectController::class, 'destroy'])->name('subjects.destroy');
    });

 
    Route::prefix('professors')->group(function () {
        Route::get('/', [ProfessorController::class, 'index'])->name('professors.index');
    });

    Route::prefix('students')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('students.index');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
