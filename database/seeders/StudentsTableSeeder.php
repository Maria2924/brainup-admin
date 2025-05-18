<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        foreach (range(12, 21) as $number) {
            Student::create([
                'user_id' => $number,
                'student_id_no' => rand(100000, 999999),
            ]);
        }
    }
}
