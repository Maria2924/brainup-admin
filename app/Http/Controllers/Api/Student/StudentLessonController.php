<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CourseLesson;
use App\Models\CourseLessonQuestions;
use App\Models\StudentCourseLessonAnswers;
use App\Http\Resources\Api\Student\CourseLessonsResource;
use App\Http\Resources\Api\Student\CourseLessonQuestionsResource;

class StudentLessonController extends Controller
{
    //
    public function showEnrolledCourseLesson(Request $request, $course_id, $lesson_id)
    {
        if (!$request->bearerToken()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $student = $request->user();
        $enrolledCourseLesson = CourseLesson::where('course_id', $course_id)->where('id', $lesson_id)->whereExists(function ($query) use ($student, $course_id) {
            $query->selectRaw(1)
                ->from('course_enrollments')
                ->where('course_id', $course_id)
                ->where('user_id', $student->id);
        })->first();
        if (!$enrolledCourseLesson) {
            return response()->json(['message' => 'You are not enrolled in this course'], 404);
        }

        $enrolledCourseLessonActivities = CourseLessonQuestions::where('lesson_id', $lesson_id)->get();

        return response()->json([
            'lesson' => CourseLessonsResource::make($enrolledCourseLesson),
            'activities' => CourseLessonQuestionsResource::collection($enrolledCourseLessonActivities),
        ]);
    }

    public function submitQuestionAnswer(Request $request, $course_id, $lesson_id, $question_id)
    {
        if (!$request->bearerToken()) {
            return response()->json(['error' => ['message' => 'Unauthorized']], 401);
        }

        $student = $request->user();
        $enrolledCourseLesson = CourseLesson::where('course_id', $course_id)->where('id', $lesson_id)->whereExists(function ($query) use ($student, $course_id) {
            $query->selectRaw(1)
                ->from('course_enrollments')
                ->where('course_id', $course_id)
                ->where('user_id', $student->id);
        })->first();
        if (!$enrolledCourseLesson) {
            return response()->json(['message' => 'You are not enrolled in this course'], 404);
        }

        

        // For Answer Submit Verification

       if ($request->answer == null) {
           return response()->json(['error' => ['message' => 'Answer is required']], 400);
       }
        $studentAnswer = StudentCourseLessonAnswers::where('user_id', $student->id)->where('course_id', $course_id)->where('lesson_id', $lesson_id)->where('question_id', $question_id)->first();
        if ($studentAnswer) {

            
            $enrolledCourseLessonAnswer = CourseLessonQuestions::where('lesson_id', $lesson_id)->where('id', $question_id)->get()->mapInto(CourseLessonQuestionsResource::class);

            return response()->json([
                'error' => ['message' => 'You have already answered'], 
                'activity' => CourseLessonQuestionsResource::collection($enrolledCourseLessonAnswer)
            ], 409);
        }

        StudentCourseLessonAnswers::create([
            'user_id' => $student->id,
            'course_id' => $course_id,
            'lesson_id' => $lesson_id,
            'question_id' => $question_id,
            'answer' => $request->answer,
        ]);

        $enrolledCourseLessonActivities = CourseLessonQuestions::where('lesson_id', $lesson_id)->where('id', $question_id)->get()->mapInto(CourseLessonQuestionsResource::class);

        return response()->json([
            'lesson' => CourseLessonsResource::make($enrolledCourseLesson),
            'activities' => CourseLessonQuestionsResource::collection($enrolledCourseLessonActivities),
            'message' => 'Answer submitted successfully',
        ], 200);
    }

}
