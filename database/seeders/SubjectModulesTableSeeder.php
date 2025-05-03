<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use App\Models\SubjectModules;

class SubjectModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 20) as $index) {
            SubjectModules::create([
                'subject_id' => $faker->unique()->numberBetween(1, 20),
                'name' => $faker->unique()->word(5),
                'code' => $faker->unique()->word(5),
                'description' => $faker->unique()->word(5),
                'file' => $faker->unique()->word(5),
            ]);
        }
    }
}
