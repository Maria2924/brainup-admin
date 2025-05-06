<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentExtraSubject extends Model
{
    //
    protected $table = 'student_extra_subjects';

    protected $fillable = [
        'student_id',
        'subject_id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
