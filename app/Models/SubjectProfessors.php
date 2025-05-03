<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectProfessors extends Model
{
    //
    protected $table = 'subject_professors';

    protected $fillable = [
        'subject_id',
        'professor_id',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }
}
