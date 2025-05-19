<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('user_dashboards/Students/dashboard/dashboard', [
            'breadcrumbs' => [
                [
                    'title' => 'Dashboard',
                    'href' => route('student.dashboard'),
                ],
            ],
            'title' => 'Dashboard',
            'description' => 'Dashboard',
        ]);
    }
}
