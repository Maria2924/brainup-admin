<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\CourseLesson;
use App\Http\Resources\Api\Student\StudentEnrolledCourseResource;
use App\Http\Resources\Api\Student\CourseLessonsResource;
use App\Models\CourseEnrollment;
class CoursesController extends Controller
{
    //
    public function enrollToCourse(Request $request, $course_id)
    {
        if (!$request->bearerToken()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $student = $request->user();

        $course = Course::find($course_id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }


        $user_enrolled = CourseEnrollment::where('course_id', $course_id)->where('user_id', $student->id)->exists();

        if ($user_enrolled) {
            return response()->json(['message' => 'You are already enrolled in this course'], 400);
        }

        CourseEnrollment::create([
            'course_id' => $course_id,
            'user_id' => $student->id,
            'enrolled_at' => now(),
        ]);

            
        return response()->json(['message' => 'You have successfully enrolled in this course'], 200);

    }
}
