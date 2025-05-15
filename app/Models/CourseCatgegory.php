<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseCatgegory extends Model
{
    protected $fillable = [
        'course_id',
        'category_name',
        'category_code',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
