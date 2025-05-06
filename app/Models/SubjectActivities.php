<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectActivities extends Model
{
    //
    protected $table = 'subject_activities';

    protected $fillable = [
        'subject_id',
        'name',
        'code',
        'description',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

}
