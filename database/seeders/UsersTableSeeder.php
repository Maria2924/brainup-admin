<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1, 20) as $index) {
            $email = $faker->unique()->safeEmail;
            // Ensure we don't use the admin email
            while ($email === 'admin@email.com') {
                $email = $faker->unique()->safeEmail;
            }
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $email,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'status' => 'active',
                'role' => $index <= 10 ? 'instructor' : 'student',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
