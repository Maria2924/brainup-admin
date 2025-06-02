<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentPasswordController extends Controller
{
    public function edit(Request $request)
    {
        $user = auth()->user();
        return Inertia::render('user_dashboards/Students/profile/password', [
            'breadcrumbs' => [
                [
                    'title' => 'Password',
                    'href' => route('student.password.edit'),
                ],
            ],
            'title' => 'Password',
            'description' => 'Password',
            'user' => $user,
        ]);
    }
}
