<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\User;
use App\Models\CourseInstructor;

class CourseInstructorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $courses = Course::all();
        $users = User::all()->where('role', 'instructor');

        $courses->each(function ($course) use ($users) {
            $instructor = $users->random(1)->first();
            CourseInstructor::create([
                'course_id' => $course->id,
                'user_id' => $instructor->id,
            ]);
        });
    }
}
