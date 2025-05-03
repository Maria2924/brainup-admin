<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ClassSubjects;

class ClassSubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 20) as $index) {
            ClassSubjects::create([
                'professor_id' => $faker->numberBetween(1, 10),
                'class_id' => $faker->numberBetween(1, 20),
                'subject_id' => $faker->numberBetween(1, 20),
            ]);
        }
    }
}
