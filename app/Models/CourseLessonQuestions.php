<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseLessonQuestions extends Model
{
    //
    protected $fillable = [
        'lesson_id',
        'question',
        'options',
        'answer',
        'type',
    ];

    public function courseLesson()
    {
        return $this->belongsTo(CourseLesson::class);
    }
}
