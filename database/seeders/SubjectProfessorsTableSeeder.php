<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class SubjectProfessorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        $faker = Faker::create();
        foreach (range(1, 20) as $index) {
            SubjectProfessors::create([
                'subject_id' => $faker->unique()->numberBetween(1, 20),
                'professor_id' => $faker->unique()->numberBetween(1, 10),
            ]);
        }
    }
}
