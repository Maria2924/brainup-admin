<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentProfileController extends Controller
{
    public function edit(Request $request)
    {
        $user = auth()->user();
        return Inertia::render('user_dashboards/Students/profile/profile', [
            'breadcrumbs' => [
                [
                    'title' => 'Profile',
                    'href' => route('student.profile'),
                ],
            ],
            'title' => 'Profile',
            'description' => 'Profile',
            'user' => $user,
        ]);
    }
}
