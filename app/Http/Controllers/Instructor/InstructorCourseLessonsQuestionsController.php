<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CourseLesson;
use App\Models\CourseLessonQuestions;

class InstructorCourseLessonsQuestionsController extends Controller
{
    public function updateQuestion(Request $request)
    {
        $question_id = $request->input('question_id');
        $question = $request->input('question');
        $type = $request->input('type');
        $answer = $request->input('answer');
        $rawOptions = $request->input('options');

        // Check if the first element is a stringified array
        if (is_string($rawOptions)) {
            $decoded = json_decode($rawOptions, true); // decode to array
        } else {
            $decoded = $rawOptions;
        }

        $received_options = [];
        foreach ((array) $decoded as $index => $value) {
            $received_options['option' . ($index + 1)] = $value;
        }


        $errors = [];
        if (empty($question)) {
            $errors['message'] = 'Question is required';
        }
        if (empty($type)) {
            $errors['message'] = 'Type is required';
        }
        if (empty($answer)) {
            $errors['message'] = 'Answer is required';
        }
        if (($type == 'multiple_choice' || $type == 'single_choice') && empty($received_options)) {
            $errors['message'] = 'Options are required';
        }

        if (empty($question_id)) {
            $errors['message'] = 'Question ID is required';
        }

        if (count($errors) > 0) {
            return response()->json(['error' => $errors], 422);
        }

        $question = CourseLessonQuestions::find($question_id);

        if (!$question) {
            return response()->json(['error' => 'Question not found'], 404);
        }

        $question->update([
            'question' => $request->question,
            'type' => $request->type,
            'answer' => $request->answer,
            'options' => $request->type == 'multiple_choice' || $request->type == 'single_choice' ? json_encode($received_options) : null,
        ]);

        return response()->json(['message' => 'Question updated successfully']);
    }


    public function storeQuestion(Request $request)
    {
        $lesson_id = $request->input('lesson_id');
        $question = $request->input('question');
        $type = $request->input('type');
        $answer = $request->input('answer');
        $rawOptions = $request->input('options');

        // Check if the first element is a stringified array
        if (is_string($rawOptions)) {
            $decoded = json_decode($rawOptions, true); // decode to array
        } else {
            $decoded = $rawOptions;
        }

        $received_options = [];
        foreach ((array) $decoded as $index => $value) {
            $received_options['option' . ($index + 1)] = $value;
        }
        


        $errors = [];
        if (empty($question)) {
            $errors['message'] = 'Question is required';
        }
        if (empty($type)) {
            $errors['message'] = 'Type is required';
        }
        if (empty($answer)) {
            $errors['message'] = 'Answer is required';
        }
        if (($type == 'multiple_choice' || $type == 'single_choice') && empty($received_options)) {
            $errors['message'] = 'Options are required';
        }

        if (count($errors) > 0) {
            return response()->json(['error' => $errors], 422);
        }

        $question = CourseLessonQuestions::create([
            'lesson_id' => $lesson_id,
            'question' => $request->question,
            'type' => $request->type,
            'answer' => $request->answer,
            'options' => $request->type == 'multiple_choice' || $request->type == 'single_choice' ? json_encode($received_options) : null,
        ]);

        return response()->json(['message' => 'Question created successfully']);
    }


    public function destroyQuestion(Request $request, string $course_id, string $lesson_id, string $question_id)
    {
        $question = CourseLessonQuestions::find($question_id);

        if (!$question) {
            return response()->json(['error' => 'Question not found'], 404);
        }

        $question->delete();

        return response()->json(['message' => 'Question deleted successfully']);
    }
}
