<?php

namespace App\Http\Resources\Api\Student;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\StudentCourseLessonAnswers;

class CourseLessonQuestionsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user_answered = StudentCourseLessonAnswers::where('question_id', $this->id)->where('user_id', $request->user()->id)->exists();
        return [
            'id' => $this->id,
            'lesson_id' => $this->lesson_id,
            'question' => $this->question,
            'options' => json_decode($this->options),
            'answer' => $this->answer,
            'type' => $this->type,
            'user_answered' => $user_answered,
            'user_answer' => [
                'user_answer' => $user_answered ? StudentCourseLessonAnswers::where('question_id', $this->id)->where('user_id', $request->user()->id)->first()->answer : null,
                'is_correct' => $user_answered ? StudentCourseLessonAnswers::where('question_id', $this->id)->where('user_id', $request->user()->id)->first()->answer == $this->answer : false,
            ],
        ];
    }
}
