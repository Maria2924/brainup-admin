<?php

namespace App\Http\Controllers\Api\Overview;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Http\Resources\Api\Overview\CoursesOverviewResource;
use App\Models\CourseInstructor;

class CoursesOverviewController extends Controller
{
    //
    public function showCoursesOverview(Request $request)
    {
        if (!$request->bearerToken()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $category_ids_raw = $request->query('category_ids');
        $category_ids = [];

        if ($category_ids_raw) {
            $decoded = json_decode($category_ids_raw, true);
            if (is_array($decoded)) {
                $category_ids = $decoded;
            }
        }

        $perPage = $request->query('per_page', 10);

        $courses = Course::where('status', 'published')
            ->when(!empty($category_ids), function ($query) use ($category_ids) {
                $query->whereHas('categories', function ($q) use ($category_ids) {
                    $q->whereIn('categories.id', $category_ids);
                });
            })
            ->paginate($perPage);

        return response()->json([
            'data' => CoursesOverviewResource::collection($courses->items()),
            'meta' => [
                'total' => $courses->total(),
                'count' => $courses->count(),
                'per_page' => $perPage,
                'current_page' => $courses->currentPage(),
                'total_pages' => $courses->lastPage(),
            ],
        ]);
    }

    public function showCourseDetails(Request $request, $course_id)
    {
        if (!$request->bearerToken()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $course = Course::where('id', $course_id)->first();

        $lessons = $course->courseLessons->count();
        $category = $course->categories->first()->name ?? 'N/A';
        $instructor = CourseInstructor::where('course_id', $course_id)->first()->user->name ?? 'N/A';

        return response()->json([
            'course_details' => CoursesOverviewResource::make($course),   
            'relationships' => [
                'lessons' => $lessons,
                'category' => $category,
                'instructor' => $instructor,
            ],
            'message' => 'You got Ligma!',
        ]);
    }


}
