<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\CourseLesson;
use App\Models\CourseLessonQuestions;

class CourseLessonQuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        foreach (CourseLesson::all() as $lesson) {
            for ($i = 0; $i < 5; $i++) {
                CourseLessonQuestions::create([
                    'lesson_id' => $lesson->id,
                    'question' => Faker::create()->sentence,
                    'answer' => Faker::create()->sentence,
                    'type' => array_values(['short_answer','single_choice','multiple_choice','true_false','long_answer'])[array_rand(['short_answer','single_choice','multiple_choice','true_false','long_answer'])],
                ]);
            }
        }

        foreach (CourseLessonQuestions::all() as $question) {
            if ($question->type == 'single_choice' || $question->type == 'multiple_choice') {
                $question->options = json_encode([
                    'option1' => Faker::create()->sentence,
                    'option2' => Faker::create()->sentence,
                    'option3' => Faker::create()->sentence,
                    'option4' => Faker::create()->sentence,
                ]);
                $question->save();
            }
        }
        
    }
}
