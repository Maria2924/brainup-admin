<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentCoursesController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = Auth::user();
        $courses = $user->courses;
        return response()->json($courses);
    }
}
