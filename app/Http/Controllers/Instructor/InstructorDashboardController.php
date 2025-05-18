<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\CourseInstructor;

class InstructorDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('user_dashboards/Instructors/dashboard/dashboard', [
            'breadcrumbs' => [
                [
                    'title' => 'Dashboard',
                    'href' => route('instructor.dashboard'),
                ],
            ],
            'title' => 'Dashboard',
            'description' => 'Dashboard',
            'courses' => CourseInstructor::where('user_id', auth()->user()->id)->get(),
        ]);
    }
}
