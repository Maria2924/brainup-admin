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
        'course_level',
        'duration',
        'status',
    ];

    public function courseLessons()
    {
        return $this->hasMany(CourseLesson::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'course_categories', 'course_id', 'category_id');
    }

    public function enrollments()
    {
        return $this->hasMany(CourseEnrollment::class);
    }
}
