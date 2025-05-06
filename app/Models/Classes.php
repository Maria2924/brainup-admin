<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    //
    protected $table = 'class';

    protected $fillable = [
        'section_name',
        'course_id',
        'year',
        'status'
    ];

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
