<?php

namespace App\Http\Requests\Course;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $courseId = $this->route('course')?->id;

        return [
            'course_name'   => 'required|string|max:255',
            'course_code'   => 'required|string|max:10|unique:courses,course_code,' . $courseId,
            'description'   => 'required|string|max:1000',
            'department_id' => 'required|exists:departments,id',
        ];
    }
}
