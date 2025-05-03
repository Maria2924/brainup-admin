<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    //
    protected $table = 'subjects';

    protected $fillable = [
        'name',
        'code',
    ];

    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }

    public function class()
    {
        return $this->belongsTo(Classes::class);
    }
}
