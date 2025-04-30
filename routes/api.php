<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;



Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', [LoginController::class, 'user']);

Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);