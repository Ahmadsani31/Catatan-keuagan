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
        $categories = Category::where('organization_id', getOrganizationiId())->get();

        return Inertia::render('master/categories/index', [
            'categories' => CategoryResource::collection($categories),
            'page_info' => [
                'title' => 'Kategori',
                'subtitle' => 'Menampilkan semua data Kategori yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('master/categories/create', [
            'page_info' => [
                'title' => 'Tambah Kategori',
                'subtitle' => 'Buat kategori baru disini, klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('master.categories.store'),
            ],
            'page_data' => [
                'categoryType' => CategoryType::options(),
            ],
        ]);
    }

    public function store(CategoryRequest $request)
    {
        try {
            Category::create([
                'organization_id' =>  getOrganizationiId(),
                'user_id' => Auth::user()->id,
                'name' =>  $request->name,
                'type' => $request->type,
            ]);

            return to_route('master.categories.index')->with([
                'type' => 'success',
                'message' => 'Tambah Successfully'
            ]);
        } catch (\Throwable $err) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('master/categories/edit', [
            'page_info' => [
                'title' => 'Edit Kategori',
                'subtitle' => 'Edit kategori baru disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('master.categories.update', $category),
            ],
            'page_data' => [
                'categoryType' => CategoryType::options(),
            ],
            'category' => new CategoryResource($category),
        ]);
    }

    public function update(Category $category, CategoryRequest $request)
    {
        try {
            $category->update([
                'name' =>  $request->name,
                'type' => $request->type,
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Tambah Successfully'
            ]);
        } catch (\Throwable $err) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }

    public function destroy(Category $category)
    {
        try {
            $category->delete();
            return back()->with([
                'type' => 'success',
                'message' => 'Tambah Successfully'
            ]);
        } catch (\Throwable $err) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }
}
