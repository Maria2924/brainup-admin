<?php

namespace App\Http\Resources\Api\Students;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentActivityAnswersResource extends JsonResource
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
            'student_id' => $this->student_id,
            'subject_activity_id' => $this->subject_activity_id,
            'subject_activity_question_id' => $this->subject_activity_question_id,
            'answer' => $this->answer,
        ];
    }
}
