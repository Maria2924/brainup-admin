<?php

namespace App\Http\Controllers;

use App\Http\Requests\Course\AddCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with('department')->latest()->get();
        $departments = Department::all();

        return Inertia::render('course/courses', [
            'courses' => CourseResource::collection($courses),
            'departments' => $departments,
        ]);
    }

   
    /**
     * Store a newly created resource in storage.
     */
    public function store(AddCourseRequest $request)
    {
        Course::create($request->validated());

        return redirect()->back()->with('success', 'Course created successfully');
       
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
