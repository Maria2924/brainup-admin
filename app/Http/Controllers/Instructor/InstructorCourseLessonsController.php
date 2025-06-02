<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\CourseInstructor;
use App\Models\CourseLesson;
use App\Models\CourseLessonQuestions;
use Inertia\Inertia;

class InstructorCourseLessonsController extends Controller
{
    //
    public function showCourseLesson(CourseInstructor $course, CourseLesson $lesson)
    {
        $course = Course::find($course->course_id);
        $lesson = CourseLesson::where('course_id', $course->id)->where('id', $lesson->id)->first();
        $activities = CourseLessonQuestions::where('lesson_id', $lesson->id)->get();

        // return response()->json([
        //     'lesson' => $lesson,
        //     'course' => $course,
        //     'activities' => $activities,
        // ]);
        
        return Inertia::render('user_dashboards/Instructors/courses/SubPages/CourseLessons/Show/index', [
            'lesson' => $lesson,
            // 'relationship' => ['course' => $lesson->course],
            'breadcrumbs' => [
                [
                    'title' => 'Courses',
                    'href' => route('instructor.courses.show', $course),
                ],
                [
                    'title' => 'Show Lesson',
                    'href' => '#',
                ],
            ],
            'title' => 'Show Lesson',
            'description' => 'Show Lesson',
            'lessons' => $course->courseLessons,
            'course' => $course,
            'activities' => $activities,
        ]);
    }

    public function store(Request $request)
    {
        $course = CourseInstructor::find($request->course_id);

        $errors = [];

        if (!$course) {
            $errors['course_id'] = 'Course not found';
        }

        if (empty($request->title)) {
            $errors['title'] = 'Title is required';
        }

        if (empty($request->content)) {
            $errors['content'] = 'Content is required';
        }

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $errors,
            ], 422);
        }

        $lesson = CourseLesson::create([
            'course_id' => $course->course_id,
            'title' => $request->title,
            'content' => $request->content,
            'video_url' => $request->video_url,
        ]);

        return response()->json([
            'message' => 'Lesson created successfully',
            'lesson' => $lesson,
        ]);
    }

    public function update(Request $request, string $course, string $lesson)
    {
        $lesson = CourseLesson::findOrFail($lesson);
        $lesson->update($request->all());
        
        return response()->json([
            'message' => 'Lesson updated successfully',
        ]);
    }

    public function destroy(string $course, string $lesson)
    {
        $lesson = CourseLesson::findOrFail($lesson);
        $lesson->delete();
        
        return Inertia::render('user_dashboards/Instructors/courses/SubPages/CourseLessons/Show/index', [
            'breadcrumbs' => [
                [
                    'title' => 'Courses',
                    'href' => route('instructor.courses'),
                ],
                [
                    'title' => 'Destroy',
                    'href' => route('instructor.course.lesson.destroy', $course),
                ],
            ],
            'title' => 'Destroy Lesson',
            'description' => 'Destroy Lesson',
            'lessons' => $course->courseLessons,
            'course' => $course,
        ]);
    }
}
