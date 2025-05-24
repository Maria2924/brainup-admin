<?php

namespace App\Http\Resources\Api\Overview;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\CourseEnrollment;

class CoursesOverviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

     
    public function toArray(Request $request): array
    {
        $user_enrolled = CourseEnrollment::where('course_id', $this->id)->where('user_id', $request->user()->id)->exists();

        return [
            'id' => $this->id,
            'name' => $this->course_name,
            'description' => $this->description,
            'category_id' => $this->category_id,
            'course_level' => $this->course_level,
            'duration' => $this->duration,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'currently_enrolled' => $user_enrolled,
        ];
    }
}
