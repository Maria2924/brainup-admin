<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CourseClassesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1, 15) as $index) {
            DB::table('course_classes')->insert([
                'course_id' => $faker->numberBetween(1, 10),
                'class_id' => $faker->numberBetween(1, 15),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
