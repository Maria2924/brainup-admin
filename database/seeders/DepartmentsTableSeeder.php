<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentsTableSeeder extends Seeder
{
    public function run()
    {
        $departmentNames = [
            'Computer Communication and Information Sciences',
            'Computer Information Technology and Design',
            'Web and Telecommunication Fundamentals',
            'Electronics and Communication Engineering',
            'Mechanical Engineering',
            'Food Unknown Cooking Klass'
        ];
        $departmentCodes = [
            'CCIS',
            'CITD',
            'WTF',
            'ECE',
            'ME',
            'FUCK'
        ];
        foreach (range(1, 6) as $index) {
            DB::table('departments')->insert([
                'department_name' => $departmentNames[$index - 1],
                'department_code' => $departmentCodes[$index - 1],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
