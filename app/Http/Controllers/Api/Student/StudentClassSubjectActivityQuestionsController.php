<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\SubjectActivityQuestions;
use App\Http\Resources\Api\Students\StudentClassSubjectActivityQuestionsResource;

class StudentClassSubjectActivityQuestionsController extends Controller
{
    //
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject_activity_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $user = Auth::user();

        if (!($user->role == 'student')) {
            return response()->json(['message' => 'You are not a student.'], 403);
        }
        
        $student_class_subject_activity_questions = SubjectActivityQuestions::where('subject_activity_id', $request->subject_activity_id)->get();
        return response()->json(StudentClassSubjectActivityQuestionsResource::collection($student_class_subject_activity_questions));
    }
}
