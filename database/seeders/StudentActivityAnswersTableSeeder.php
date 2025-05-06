<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StudentActivityAnswers;
use Faker\Factory;

class StudentActivityAnswersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faker = Factory::create();

        for ($i = 0; $i < 100; $i++) {
            StudentActivityAnswers::create([
                'student_id' => $faker->numberBetween(1, 10),
                'subject_activity_id' => $faker->numberBetween(1, 20),
                'subject_activity_question_id' => $faker->numberBetween(1, 100),
                'answer' => $faker->paragraph,
            ]);
        }
    }
}
