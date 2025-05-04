<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Student\StudentSubjectsController;
use App\Http\Controllers\Api\Student\StudentExtraSubjectsController;
use App\Http\Controllers\Api\Student\StudentSubjectModulesController;
use App\Http\Controllers\Api\Student\StudentClassSubjectActivitiesController;
use App\Http\Controllers\Api\Student\StudentClassSubjectActivityQuestionsController;
use App\Http\Controllers\Api\Student\StudentActivityAnswersController;
use App\Http\Middleware\RoleMiddleware;

// Auth Routes
Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', [LoginController::class, 'user']);

Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);


Route::middleware(['auth:sanctum', RoleMiddleware::class . ':student'])->group(function () {
    Route::get('/student/subjects', [StudentSubjectsController::class, 'index']);
    Route::get('/student/extra-subjects', [StudentExtraSubjectsController::class, 'index']);

    Route::get('/student/subject-modules', [StudentSubjectModulesController::class, 'index']);
    Route::get('/student/subject-activities', [StudentClassSubjectActivitiesController::class, 'index']);
    Route::get('/student/subject-activity-questions', [StudentClassSubjectActivityQuestionsController::class, 'index']);
    Route::get('/student/subject-activity-answers', [StudentActivityAnswersController::class, 'index']);
});
