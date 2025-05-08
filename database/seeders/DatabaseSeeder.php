<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Example admin user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'admin@email.com',   
            'role' => 'admin',
            'status' => 'active',
            'password' => Hash::make('password'),
        ]);

        // Custom seeders
        $this->call([
            UsersTableSeeder::class,
            StudentsTableSeeder::class,
            ProfessorsTableSeeder::class,
            CoursesTableSeeder::class,
            SubjectsTableSeeder::class,
            SubjectModulesTableSeeder::class,
            SubjectActivitiesTableSeeder::class,
            SubjectActivityQuestionsTableSeeder::class,
            StudentActivityAnswersTableSeeder::class,
            StudentSubjectsTableSeeder::class,
        ]);
    }
}
