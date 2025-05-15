<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CoursesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $courseNames = [
            'Computer Science',
            'Information Technology',
            'Web Technology and Fundamentals',
            'Electrical and Electronics Engineering',
            'Mechanical Engineering',
        ];
        $courseCodes = [
            'CS',
            'IT',
            'WT',
            'EE',
            'ME',
        ];
        foreach (range(1, 5) as $index) {
            DB::table('courses')->insert([
                'course_name' => $courseNames[$index - 1],
                'course_code' => $courseCodes[$index - 1],
                'description' => $faker->sentence,
                'course_level' => 'beginner',
                'status' => 'draft',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
