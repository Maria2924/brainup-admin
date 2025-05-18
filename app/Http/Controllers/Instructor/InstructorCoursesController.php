<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CourseInstructor;

class InstructorCoursesController extends Controller
{
    public function index()
    {
        return Inertia::render('user_dashboards/Instructors/courses/courses', [
            'breadcrumbs' => [
                [
                    'title' => 'Courses',
                    'href' => route('instructor.courses'),
                ],
            ],
            'title' => 'Courses',
            'description' => 'Courses',
            'courses' => CourseInstructor::where('user_id', auth()->user()->id)->get(),
        ]);
    }
}
