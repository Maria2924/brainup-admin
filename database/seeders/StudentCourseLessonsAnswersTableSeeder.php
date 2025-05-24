<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CourseLesson;
use App\Models\CourseLessonQuestions;
use App\Models\StudentCourseLessonAnswers;
use App\Models\User;
use Faker\Factory as Faker;

class StudentCourseLessonsAnswersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        foreach (CourseLesson::all() as $lesson) {
            for ($i = 0; $i < 5; $i++) {
                StudentCourseLessonAnswers::create([
                    'user_id' => User::where('role', 'student')->get()->random()->id,
                    'course_id' => $lesson->course_id,
                    'lesson_id' => $lesson->id,
                    'question_id' => CourseLessonQuestions::where('lesson_id', $lesson->id)->inRandomOrder()->first()->id,
                    'answer' => Faker::create()->sentence,
                ]);
            }
        }
    }
}
