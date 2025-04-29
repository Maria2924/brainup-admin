<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ClassesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1, 15) as $index) {
            DB::table('class')->insert([
                'section_name' => $faker->randomElement(['Scrotum', 'Indium', 'Codemium', 'Dilithium', 'Xenon']),
                'course_id' => $faker->numberBetween(1,5),
                'year' => $faker->numberBetween(1, 4),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}