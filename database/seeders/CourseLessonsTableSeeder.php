<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\CourseLesson;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
class CourseLessonsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $courses = Course::all()->pluck('id');
        foreach (range(1, 20) as $i) {
            $course_id = $courses->random();
            CourseLesson::create([
                'course_id' => $course_id,
                'title' => $faker->sentence,
                'video_url' => $faker->url,
                'content' => $faker->paragraph,
                'order' => $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
