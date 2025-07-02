<?php

namespace App\Http\Controllers;

use App\Enums\CategoryType;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $organization = Auth::user()->organizations()->first();
        // $categories = Category::whereHas('organization', function ($query) use ($organization) {
        //     $query->where('id', $organization->id);
        // })->get();
        $categories = Category::where('organization_id', $organization->id)->get();

        return Inertia::render('master/categories/index', [
            'categories' => CategoryResource::collection($categories),
            'page_info' => [
                'title' => 'Category',
                'subtitle' => 'Menampilkan semua data Category yang ada di platform ini, untuk di kelola',
            ],
            'page_data' => [
                'categoryType' => CategoryType::options(),
            ],
        ]);
    }

    public function store(CategoryRequest $request)
    {
        try {
            $organization = Auth::user()->organizations()->first();

            Category::create([
                'organization_id' => $organization->id,
                'user_id' => Auth::user()->id,
                'name' =>  $request->name,
                'type' => $request->type,
            ]);

            return to_route('master.categories.index')->with([
                'type' => 'success',
                'message' => 'Tambah Successfully'
            ]);
        } catch (\Throwable $ee) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }
}
