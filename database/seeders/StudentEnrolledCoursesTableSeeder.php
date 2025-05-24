<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Course;
use Illuminate\Support\Facades\DB;

class StudentEnrolledCoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $EnrolledCourses = Course::all()->pluck('id');
        $users = User::where('role', 'student')->get()->pluck('id');
        $enrollments = [];
        foreach (range(1, 20) as $i) {
            $course_id = $EnrolledCourses->random();
            $user_id = $users->random();
            $enrollments[] = ['course_id' => $course_id, 'user_id' => $user_id];
        }
        DB::table('course_enrollments')->insert($enrollments);
    }
}
