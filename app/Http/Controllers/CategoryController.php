<?php

namespace App\Http\Controllers;

use App\Enums\CategoryType;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::where('organization_id', getOrganizationiId())->latest()->get();

        return Inertia::render('master/categories/index', [
            'categories' => CategoryResource::collection($categories),
            'page_info' => [
                'title' => 'Kategori',
                'subtitle' => 'Menampilkan semua data Kategori yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        try {
            Category::create([
                'organization_id' =>  getOrganizationiId(),
                'user_id' => Auth::user()->id,
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

    public function update(Category $category, CategoryRequest $request)
    {
        try {
            $category->update([
                'name' =>  $request->name,
                'type' => $request->type,
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Update Successfully'
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
                'message' => 'Delete Successfully'
            ]);
        } catch (\Throwable $err) {
            return back()->with([
                'type' => 'error',
                'message' => $err->getMessage()
            ]);
        }
    }

    public function edit_json(Category $category)
    {
        return response()->json([
            'page_info' => [
                'title' => 'Edit Kategori',
                'subtitle' => 'Edit kategori baru disini, klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('master.categories.update', $category),
            ],
            'category' => new CategoryResource($category),
        ]);
    }
}
