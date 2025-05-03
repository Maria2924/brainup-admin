<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SubjectActivites;

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
                'name' => $faker->unique()->word(5),
                'code' => $faker->unique()->word(5),
            ];
        }
        SubjectActivities::insert($data);
    }
}
