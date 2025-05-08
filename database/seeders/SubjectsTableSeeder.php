<?php

namespace Database\Seeders;

use App\Models\Subject;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 20) as $index) {
            Subject::create([
                'name' => $faker->unique()->word(5),
                'code' => $faker->unique()->word(5),
                'professor_id' => $faker->numberBetween(1, 10),
            ]);
        }
    }
}
