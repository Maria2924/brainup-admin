<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CourseInstructor;
use App\Models\Course;
use App\Models\Module;
use App\Models\Activity;

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
            'courses' => CourseInstructor::where('user_id', auth()->user()->id)->with('course')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('user_dashboards/Instructors/courses/SubPages/CourseCreation/index', [
            'breadcrumbs' => [
                [
                    'title' => 'Courses',
                    'href' => route('instructor.courses'),
                ],
                [
                    'title' => 'Create',
                    'href' => route('instructor.courses.create'),
                ],
            ],
            'title' => 'Create Course',
            'description' => 'Create Course',
        ]);
    }

    public function show(CourseInstructor $course)
    {
        $course = Course::with('courseLessons')->find($course->course_id);
        
        return Inertia::render('user_dashboards/Instructors/courses/SubPages/CourseShow/index', [
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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'code' => 'required',
            'description' => 'required',
        ]);

        $course = Course::create([
            'course_name' => $request->name,
            'course_code' => $request->code,
            'description' => $request->description,
        ]);

        CourseInstructor::create([
            'user_id' => auth()->user()->id,
            'course_id' => $course->id,
        ]);

        return redirect()->route('instructor.courses')->with('success', 'Course created successfully');
    }

    public function update(Request $request, CourseInstructor $course)
    {
        $request->validate([
            'name' => 'required',
            'code' => 'required',
            'description' => 'required',
        ]);

        $course->update([
            'course_name' => $request->name,
            'course_code' => $request->code,
            'description' => $request->description,
        ]);

        return redirect()->route('instructor.courses')->with('success', 'Course updated successfully');
    }

    public function destroy(CourseInstructor $course)
    {
        $course->delete();

        return redirect()->route('instructor.courses')->with('success', 'Course deleted successfully');
    }
}
