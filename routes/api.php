<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
// use App\Http\Controllers\Api\Student\StudentSubjectsController;
// use App\Http\Controllers\Api\Student\StudentExtraSubjectsController;
// use App\Http\Controllers\Api\Student\StudentSubjectModulesController;
// use App\Http\Controllers\Api\Student\StudentClassSubjectActivitiesController;
// use App\Http\Controllers\Api\Student\StudentClassSubjectActivityQuestionsController;
// use App\Http\Controllers\Api\Student\StudentActivityAnswersController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\Api\Overview\CoursesOverviewController;
use App\Http\Controllers\Api\Overview\CategoriesOverviewController;
use App\Http\Controllers\Api\Student\CoursesController;
use App\Http\Controllers\Api\Student\StudentEnrolledCoursesController;
use App\Http\Controllers\Api\Student\StudentLessonController;
// Auth Routes
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

Route::middleware('auth:sanctum')->get('/user', [LoginController::class, 'user']);

Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);



Route::middleware(['auth:sanctum', RoleMiddleware::class . ':student'])->group(function () {
    
        // For Searching of Courses 
        Route::get('/overview/categories', [CategoriesOverviewController::class, 'showCategoriesOverview']);
        Route::get('/overview/available-courses', [CoursesOverviewController::class, 'showCoursesOverview']);
        Route::get('/overview/course/{course_id}/show', [CoursesOverviewController::class, 'showCourseDetails']);

        Route::post('/student/course/{course_id}/enroll', [CoursesController::class, 'enrollToCourse']);

        Route::get('/student/enrolled-courses', [StudentEnrolledCoursesController::class, 'getEnrolledCourses']);
        Route::get('/student/enrolled-course/{course_id}/enroll', [StudentEnrolledCoursesController::class, 'enrollToCourse']);
        Route::get('/student/enrolled-course/{course_id}/show', [StudentEnrolledCoursesController::class, 'showEnrolledCourseDetails']);
        Route::get('/student/enrolled-course/{course_id}/lesson/{lesson_id}/activities', [StudentLessonController::class, 'showEnrolledCourseLesson']);
        Route::post('/student/enrolled-course/{course_id}/lesson/{lesson_id}/question/{question_id}/submit-answer', [StudentLessonController::class, 'submitQuestionAnswer']);
});



// Needed API Routes
 // available courses overview (filterable by category)
 // Enroll to course
 // show courses
 // show student course lessons
 // show student course activities
 // show student course activity questions
 // answer student course activity questions
 // show student course activity overview
 // show student course overview
 