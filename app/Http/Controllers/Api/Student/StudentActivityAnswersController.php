<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\StudentActivityAnswers;
use App\Http\Resources\Api\Students\StudentActivityAnswersResource;
use App\Models\Student;

class StudentActivityAnswersController extends Controller
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

        $student_id = Student::where('user_id', $user->id)->first()->id;

        if (!($user->role == 'student')) {
            return response()->json(['message' => 'You are not a student.'], 403);
        }
        
        $student_activity_answers = StudentActivityAnswers::where('subject_activity_id', $request->subject_activity_id)->where('student_id', $student_id)->get();
        return response()->json(StudentActivityAnswersResource::collection($student_activity_answers));
    }
}
