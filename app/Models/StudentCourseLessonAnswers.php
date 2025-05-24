<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentCourseLessonAnswers extends Model
{
    //
    protected $fillable = [
        'user_id',
        'course_id',
        'lesson_id',
        'question_id',
        'answer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function lesson()    
    {
        return $this->belongsTo(CourseLesson::class);
    }

    public function question()
    {
        return $this->belongsTo(CourseLessonQuestions::class);
    }
}
