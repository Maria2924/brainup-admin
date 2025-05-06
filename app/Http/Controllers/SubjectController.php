<?php

namespace App\Http\Controllers;

use App\Http\Requests\Subject\AddSubjectRequest;
use App\Http\Requests\Subject\UpdateSubjectRequest;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects =  Subject::latest()->get();

        return Inertia::render('subjects/subjects', [
            'subjects' => $subjects,
        ]);
    }

    public function store(AddSubjectRequest $request)
    {

        Subject::create($request->validated());

        return redirect()->back()->with('success', 'Subject added successfully');
    }

    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        $subject->update($request->validated());

        return redirect()->back()->with('success', 'Subject updated successfully');
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();

        return redirect()->back()->with('success', 'Subject deleted successfully');
    }
}
