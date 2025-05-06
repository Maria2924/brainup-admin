<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'auth:sanctum' => \Laravel\Sanctum\Http\Middleware\EnsureTokenIsValid::class,
        'user' => \App\Http\Middleware\UserMiddleware::class, // Add this line
        'role' => \App\Http\Middleware\RoleMiddleware::class, // I noticed you're also using a role middleware
    ];
}
