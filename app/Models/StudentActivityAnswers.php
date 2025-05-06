<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentActivityAnswers extends Model
{
    //
    protected $table = 'student_activity_answers';
    protected $fillable = [
        'student_id',
        'subject_activity_id',
        'subject_activity_question_id',
        'answer',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function activity()
    {
        return $this->belongsTo(SubjectActivities::class);
    }

    public function question()
    {
        return $this->belongsTo(SubjectActivityQuestions::class);
    }
}
