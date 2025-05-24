<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\CourseInstructor;
use Inertia\Inertia;

class InstructorCourseLessonsController extends Controller
{
    //
    public function show(CourseInstructor $course)
    {
        $course = Course::with('courseLessons')->find($course->course_id);
        
        return Inertia::render('user_dashboards/Instructors/courses/SubPages/CourseLessons/index', [
            'breadcrumbs' => [
                [
                    'title' => 'Courses',
                    'href' => route('instructor.courses'),
                ],
                [
                    'title' => 'Show',
                    'href' => route('instructor.courses.show', $course),
                ],
            ],
            'title' => 'Show Course',
            'description' => 'Show Course',
            'lessons' => $course->courseLessons,
            'course' => $course,
        ]);
    }
}
