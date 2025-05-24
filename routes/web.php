<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\RoleMiddleware;

//Admin Routes
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\InstructorsController;


//Instructor Routes
use App\Http\Controllers\Instructor\InstructorDashboardController;
use App\Http\Controllers\Instructor\InstructorProfileController;
use App\Http\Controllers\Instructor\InstructorCoursesController;

//Student Routes
use App\Http\Controllers\Student\StudentDashboardController;

Route::get('/', function () {   
    return Inertia::render('welcome');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('auth/register');
})->name('register');

Route::prefix('admin')->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->group(function () {
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

Route::prefix('instructor')->middleware(['auth', 'verified', RoleMiddleware::class . ':instructor'])->group(function () {
    // Instructor Dashboard Routes
    Route::get('dashboard', [InstructorDashboardController::class, 'index'])->name('instructor.dashboard');
    Route::get('profile', [InstructorProfileController::class, 'index'])->name('instructor.profile');
    Route::prefix('courses')->group(function () {
        Route::get('/', [InstructorCoursesController::class, 'index'])->name('instructor.courses');
        Route::get('/create', [InstructorCoursesController::class, 'create'])->name('instructor.courses.create');
        Route::post('/store', [InstructorCoursesController::class, 'store'])->name('instructor.courses.store');
        Route::get('/{course}/show', [InstructorCoursesController::class, 'show'])->name('instructor.courses.show');
        Route::patch('/update/{course}', [InstructorCoursesController::class, 'update'])->name('instructor.courses.update');
        Route::delete('/destroy/{course}', [InstructorCoursesController::class, 'destroy'])->name('instructor.courses.destroy');
    });
});

Route::prefix('student')->middleware(['auth', 'verified', RoleMiddleware::class . ':student'])->group(function () {
    // Student Dashboard Routes
    Route::get('dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard');
    // Route::get('profile', [StudentProfileController::class, 'index'])->name('student.profile');
    // Route::get('courses', [StudentCoursesController::class, 'index'])->name('student.courses');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
