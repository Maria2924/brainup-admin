<?php

namespace App\Http\Resources\Api\Students;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentSubjectModulesResource extends JsonResource
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
            'subject_id' => $this->subject_id,
            'name' => $this->name,
            'code' => $this->code,
            'description' => $this->description,
            'file' => $this->file,
        ];
    }
}
