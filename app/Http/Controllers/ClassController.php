<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassSection\AddClassSectionRequest;
use App\Http\Requests\ClassSection\UpdateClassSectionRequest;
use App\Http\Resources\ClassesResource;
use App\Models\Classes;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    public function index()
    {

        $classes = Classes::with('course')->latest()->get();
        $courses = Course::orderBy('course_name')->get();

        return Inertia::render('classes/classes', [
            'classes' => ClassesResource::collection($classes),
            'courses' => $courses,
        ]);
    }

    public function store(AddClassSectionRequest $request)
    {

        Classes::create($request->validated());

        return redirect()->back()->with('success', 'Class section added successfully');

    }

    public function update(UpdateClassSectionRequest $request, Classes $classSection)
    {

        $classSection->update($request->validated());

        return redirect()->back()->with('success', 'Class section updated successfully');

    }

    public function destroy(Classes $classSection)
    {
        $classSection->delete();

        return redirect()->back()->with('success', 'Class section deleted successfully');
    }
}
