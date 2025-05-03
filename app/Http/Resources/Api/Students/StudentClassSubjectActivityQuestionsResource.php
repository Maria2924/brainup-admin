<?php

namespace App\Http\Resources\Api\Students;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentClassSubjectActivityQuestionsResource extends JsonResource
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
            'subject_activity_id' => $this->subject_activity_id,
            'question' => $this->question,
            // 'answer' => $this->answer,
            'file' => $this->file,
            'type' => $this->type,
        ];
    }
}
