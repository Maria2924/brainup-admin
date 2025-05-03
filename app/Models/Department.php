<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    //
    protected $table = 'departments';

    protected $fillable = [
        'department_name',
        'department_code',
    ];

    public function courses()   
    {
        return $this->hasMany(Course::class);
    }

    public function professors()
    {
        return $this->hasMany(Professor::class);
    }
}
