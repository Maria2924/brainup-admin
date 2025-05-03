<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassSubjects extends Model
{
    //
    protected $table = 'class_subjects';

    protected $fillable = [
        'class_id',
        'subject_id',
    ];

    public function class()
    {
        return $this->belongsTo(Classes::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
