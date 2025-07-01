<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrganizationResource;
use App\Models\Organizations;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationsController extends Controller
{
    public function index()
    {
        return Inertia::render('organizations/index', [
            'organizations' => OrganizationResource::collection(Organizations::latest()->get()),
            'page_info' => [
                'title' => 'Organisasi',
                'subtitle' => 'Menampilkan semua data organisasi yang ada di platform ini, untuk di kelola',
            ],
        ]);
    }

    public function create($id)
    {
        $organizations = [];
        if ($id) {
            $organizations = Organizations::find($id);
        }

        return Inertia::render('organizations/organizationsCreate', [
            'organizations' => $organizations
        ]);
    }

    public function detail($id)
    {

        $organizations = Organizations::find($id);
        return Inertia::render('organizations/organizationsDetail', [
            'organizations' => $organizations
        ]);
    }
}
