<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subject_activity_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subject_activity_id')->constrained('subject_activities')->cascadeOnDelete();
            $table->string('question');
            $table->string('answer')->nullable();
            $table->string('file')->nullable();
            $table->string('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_activity_questions');
    }
};
