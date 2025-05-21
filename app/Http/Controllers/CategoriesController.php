<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoriesResource;
use App\Models\Categories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Categories::with('organization')->get();
        return Inertia::render('categories/categoriesIndex', [
            'categories' => CategoriesResource::collection($categories)
        ]);
    }
}
