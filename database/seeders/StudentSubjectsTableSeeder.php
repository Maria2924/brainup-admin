<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StudentSubjectsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $students = DB::table('students')->pluck('id');
        $subjects = DB::table('subjects')->pluck('id');

        foreach ($students as $studentId) {
            // Randomly assign 1-3 subjects to each student
            $assignedSubjects = $subjects->random(rand(1, 10));
            
            foreach ($assignedSubjects as $subjectId) {
                DB::table('student_subjects')->insert([
                    'student_id' => $studentId,
                    'subject_id' => $subjectId,
                ]);
            }
        }
    }
}

