<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstructorProfileController extends Controller
{

    public function edit(Request $request)
    {
        $user = auth()->user();
        return Inertia::render('user_dashboards/Instructors/profile/profile', [
            'breadcrumbs' => [
                [
                    'title' => 'Profile',
                    'href' => route('instructor.profile'),
                ],
            ],
            'title' => 'Profile',
            'description' => 'Profile',
            'user' => $user,
        ]);
    }
}
