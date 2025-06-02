<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    //
    
    public function register(Request $request): JsonResponse
    {
        // Normalize email
        $email = strtolower($request->email);

        // Manually validate inputs
        $errors = [];

        // Validate name
        if (empty($request->name) || !is_string($request->name)) {
            $errors['name'] = 'Name is required and must be a string.';
        } elseif (strlen($request->name) > 255) {
            $errors['name'] = 'Name must not exceed 255 characters.';
        }

        // Validate email
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'A valid email is required.';
        } elseif (strlen($email) > 255) {
            $errors['email'] = 'Email must not exceed 255 characters.';
        } elseif (User::where('email', $email)->exists()) {
            $errors['email'] = 'This email is already taken.';
        }

        // Validate password
        $password = $request->password;
        $password_confirmation = $request->password_confirmation ?? null;

        if (empty($password)) {
            $errors['password'] = 'Password is required.';
        } elseif (strlen($password) < 8) {
            $errors['password'] = 'Password must be at least 8 characters.';
        } elseif ($password !== $password_confirmation) {
            $errors['password_confirmation'] = 'Password confirmation does not match.';
        }

        if (!empty($errors)) {
            return response()->json([
                'success' => false,
                'errors' => $errors,
            ], 422);
        }

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $email,
            'password' => Hash::make($password),
            'role' => 'student',
            'status' => 'active',
        ]);

        event(new Registered($user));

        Auth::login($user);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => $user,
            'message' => 'User registered successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

}
