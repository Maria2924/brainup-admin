<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use App\Models\Subject;
use App\Http\Resources\Api\Students\StudentSubjectsResource;

class StudentSubjectsController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = Auth::user();

        if ($user->role !== 'student') {
            return response()->json(['error' => 'User is not a student'], 403);
        }

        $student = Student::where('user_id', $user->id)->first();

        if (!$student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

      $subjects = Subject::select('subjects.*', 'users.name as professor_name')
        ->join('class_subjects', 'subjects.id', '=', 'class_subjects.subject_id')
        ->join('professors', 'class_subjects.professor_id', '=', 'professors.id')
        ->join('users', 'professors.user_id', '=', 'users.id')
        ->where('class_subjects.class_id', $student->class_id)
        ->get();


        return response()->json(StudentSubjectsResource::collection($subjects));
    }
}
