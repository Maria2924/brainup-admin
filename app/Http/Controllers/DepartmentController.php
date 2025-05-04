<?php

namespace App\Http\Controllers;

use App\Http\Requests\Department\AddDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Department::latest()->get();

        return Inertia::render('departments/departments', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddDepartmentRequest $request)
    {
        Department::create($request->validated());
        return redirect()->back()->with('success', 'Department added successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        $department->update($request->validated());
        return redirect()->back()->with('success', 'Department updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {

        DB::beginTransaction();

        try {
            $department->delete();
            DB::commit();

            return redirect()->back()->with('success', 'Department deleted successfully.');
        } catch (\Throwable $e) {
            DB::rollBack();

            return back()->withErrors([
                'department' => 'Cannot delete department: ' . $e->getMessage(),
            ]);
        }
    }
}
