<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'course_name' => $this->course_name,
            'course_code' => $this->course_code,
            'description' => $this->description,
            'course_level' => $this->course_level,
            'status' => $this->status,
            'duration' => $this->duration,
            'created_at' => $this->created_at,
        ];
    }
}
