<?php

namespace App\Http\Controllers;

use App\Http\Requests\Course\AddCourseRequest;
use App\Http\Requests\Course\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::latest()->get();

        return Inertia::render('course/courses', [
            'courses' => CourseResource::collection($courses),
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
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $course->update($request->validated());

        return redirect()->back()->with('success', 'Course updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->back()->with('success', 'Course deleted successfully');
    }
}
