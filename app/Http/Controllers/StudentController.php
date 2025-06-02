<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\StudentResource;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = User::latest()->where('role', 'student')->get();

        return Inertia::render('students/students', [
            'students' => StudentResource::collection($students),
        ]);
    }
}
