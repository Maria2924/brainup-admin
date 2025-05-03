<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectActivityQuestions extends Model
{
    //
    protected $table = 'subject_activity_questions';

    protected $fillable = [
        'subject_activity_id',
        'question',
        'answer',
    ];

    public function subject_activity()
    {
        return $this->belongsTo(SubjectActivities::class);
    }
}
