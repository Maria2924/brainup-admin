<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubjectActivities;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Api\Students\StudentClassSubjectActivitiesResource;

class StudentClassSubjectActivitiesController extends Controller
{
    //
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $user = Auth::user();
        $student_id = $user->id;

        if (!($user->role == 'student')) {
            return response()->json(['message' => 'You are not a student.'], 403);
        }
        
        $student_class_subject_activities = SubjectActivities::where('subject_id', $request->subject_id)->get();
        return response()->json(StudentClassSubjectActivitiesResource::collection($student_class_subject_activities));
    }
}
