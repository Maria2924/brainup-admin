<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Course;
use App\Models\CourseCategory;

class CourseCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        $courses = Course::all();

        $categories->each(function ($category) use ($courses) {
            $courses->random(rand(1, $courses->count()))->each(function ($course) use ($category) {
                CourseCategory::create([
                    'category_id' => $category->id,
                    'course_id' => $course->id,
                ]);
            });
        });
    }
}
