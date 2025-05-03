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
        'department_id',
    ];

    public function classes()
    {
        return $this->hasMany(Classes::class);
    }
}
