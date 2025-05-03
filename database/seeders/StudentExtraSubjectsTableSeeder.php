<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use App\Models\StudentExtraSubject;

class StudentExtraSubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 30) as $index) {
            StudentExtraSubject::create([
                'professor_id' => $faker->numberBetween(1, 10),
                'student_id' => $faker->numberBetween(1, 10),
                'subject_id' => $faker->numberBetween(1, 20),
            ]);
        }
    }
}
