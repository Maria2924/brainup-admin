<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    //
    protected $table = 'courses';

    protected $fillable = [
        'course_name',
        'course_code',
        'description',
    ];

    public function classes()
    {
        return $this->hasMany(Classes::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }
}
