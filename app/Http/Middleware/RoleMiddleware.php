<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (Auth::check() && in_array(Auth::user()->role, $roles)) {
            return $next($request);
        }

         // Return an unauthorized response if the user doesn't have the correct role
         if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Unauthorized', 
                'errors' => ['unauthorized' => ['User is not Authorized'],]
            ], 403); // Custom unauthorized message
        }

        // Redirect unauthorized users
        return redirect('/unauthorized'); // Adjust this to a proper page or action
    }
}
