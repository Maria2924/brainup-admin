<?php

namespace App\Http\Controllers;

use App\Http\Resources\InstructorResource;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Instructor\AddInstructorRequest;
use App\Http\Requests\Instructor\UpdateInstructorRequest;   

class InstructorsController extends Controller
{
    //
    public function index()
    {
        $instructors = User::latest()->where('role', 'instructor')->get();

        return Inertia::render('instructor/instructors', [
            'instructors' => InstructorResource::collection($instructors),
        ]);
    }

    public function store(AddInstructorRequest $request)
    {
        $instructor = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'instructor',
            'status' => 'active',
            'password' => Hash::make($request->password),
        ]);

        return Inertia::render('instructor/instructors', [
            'instructors' => InstructorResource::collection(User::latest()->where('role', 'instructor')->get()),
        ]);
    }

    public function update(UpdateInstructorRequest $request, $id)
    {
        $instructor = User::find($id);
        $instructor->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'instructor',
            'status' => 'active',
            'password' => Hash::make($request->password),
        ]);

        return Inertia::render('instructor/instructors', [
            'instructors' => InstructorResource::collection(User::latest()->where('role', 'instructor')->get()),
        ]);
    }

    public function destroy($id)
    {
        $instructor = User::find($id);
        $instructor->delete();

        return Inertia::render('instructor/instructors', [
            'instructors' => InstructorResource::collection(User::latest()->where('role', 'instructor')->get()),
        ]);
    }
}
