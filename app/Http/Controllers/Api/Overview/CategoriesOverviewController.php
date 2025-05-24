<?php

namespace App\Http\Controllers\Api\Overview;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Resources\Api\Overview\CategoriesOverviewResource;

class CategoriesOverviewController extends Controller
{
    public function showCategoriesOverview(Request $request)
    {
        if (!$request->bearerToken()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $categories = Category::all();
        return response()->json(CategoriesOverviewResource::collection($categories));
    }
}
