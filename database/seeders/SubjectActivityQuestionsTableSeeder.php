<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\SubjectActivityQuestions;

class SubjectActivityQuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faker = Faker::create();
        $data = [];
        foreach (range(1, 100) as $index) {
            $data[] = [
                'subject_activity_id' => $faker->numberBetween(1, 20),
                'question' => $faker->sentence(10),
                'answer' => $faker->sentence(10),
                'file' => $faker->fileExtension(),
                'type' => $faker->randomElement(['multiple_choice', 'short_answer', 'long_answer']),
            ];
        }
        SubjectActivityQuestions::insert($data);
    }
}
