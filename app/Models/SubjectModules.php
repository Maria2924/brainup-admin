<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectModules extends Model
{
    //
    protected $table = 'subject_modules';

    protected $fillable = [
        'subject_id',
        'name',
        'code',
        'description',
        'file',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
