<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StudentsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1, 10) as $index) {
            DB::table('students')->insert([
                'user_id' => $index + 11,
                'student_id_no' => $faker->unique()->numberBetween(10000000, 99999999),
                'class_id' => $faker->numberBetween(1, 15),
                'year' => $faker->numberBetween(1, 4),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
