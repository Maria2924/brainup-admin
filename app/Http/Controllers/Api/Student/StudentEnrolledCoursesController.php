<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\CourseLesson;
use App\Models\CourseLessonQuestions;
use App\Http\Resources\Api\Student\StudentEnrolledCourseResource;
use App\Http\Resources\Api\Student\CourseLessonsResource;
use App\Http\Resources\Api\Student\CourseLessonQuestionsResource;
class StudentEnrolledCoursesController extends Controller
{
    //
    public function getEnrolledCourses(Request $request)
    {
        if (!$request->bearerToken()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $student = $request->user();
        $enrolledCourses = Course::whereIn('id', function ($query) use ($student) {
            $query->select('course_id')
                ->from('course_enrollments')
                ->where('user_id', $student->id);
        })->get();
        return response()->json(StudentEnrolledCourseResource::collection($enrolledCourses));
    }

    public function showEnrolledCourseDetails(Request $request, $course_id)
    {
        if (!$request->bearerToken()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $student = $request->user();
        $enrolledCourseDetails = Course::where('id', $course_id)->whereHas('enrollments', function ($query) use ($student) {
            $query->where('user_id', $student->id);
        })
            ->first();

        if (!$enrolledCourseDetails) {
            return response()->json(['message' => 'You are not enrolled in this course'], 404);
        }
        
        $enrolledCourseLessons = CourseLesson::where('course_id', $course_id)->get();

            
        return response()->json([
            'course_details' => StudentEnrolledCourseResource::make($enrolledCourseDetails),
            'relationships' => ['lessons' => CourseLessonsResource::collection($enrolledCourseLessons), 'message' => 'You got Ligma!'],
            'message' => 'You got Ligma!',
        ], 200);

    }

    
}
