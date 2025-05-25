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

    public function create(CourseInstructor $course)
    {
        $course = Course::with('courseLessons')->find($course->course_id);
        
        return Inertia::render('user_dashboards/Instructors/courses/SubPages/CourseLessons/Show/index', [
            'breadcrumbs' => [
                [
                    'title' => 'Courses',
                    'href' => route('instructor.courses.show', $course),
                ],
                [
                    'title' => 'Create',
                    'href' => '#',
                ],
            ],
            'title' => 'Create Lesson',
            'description' => 'Create Lesson',
            'lessons' => $course->courseLessons,
            'course' => $course,
        ]);
    }

    public function store(Request $request, CourseInstructor $course)
    {
        $course = Course::with('courseLessons')->find($course->course_id);
        
        
        return Inertia::render('user_dashboards/Instructors/courses/SubPages/CourseLessons/Show/index', [
            'breadcrumbs' => [
                [
                    'title' => 'Courses',
                    'href' => route('instructor.courses'),
                ],
                [
                    'title' => 'Store',
                    'href' => route('instructor.course.lesson.store', $course),
                ],
            ],
            'title' => 'Store Lesson',
            'description' => 'Store Lesson',
            'lessons' => $course->courseLessons,
            'course' => $course,
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
