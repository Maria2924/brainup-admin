<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SubjectActivities;

class SubjectActivitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $data = [];
        foreach (range(1, 20) as $index) {
            $data[] = [
                'subject_id' => $faker->numberBetween(1, 20),
                'name' => $faker->unique()->word(5),
                'code' => $faker->unique()->word(5),
                'description' => $faker->sentence(10),
            ];
        }
        SubjectActivities::insert($data);
    }
}
