<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentsTableSeeder extends Seeder
{
    public function run()
    {
        $departmentNames = [
            'CCIS',
            'CITD',
            'WTF',
            'ECE',
            'ME',
        ];
        foreach (range(1, 5) as $index) {
            DB::table('departments')->insert([
                'department_name' => $departmentNames[$index - 1],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
