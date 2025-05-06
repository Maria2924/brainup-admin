<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseClass extends Model
{
    //
    protected $table = 'course_classes';

    protected $fillable = [
        'course_id',
        'class_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function class()
    {
        return $this->belongsTo(Classes::class);
    }
}
