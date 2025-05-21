<?php

namespace App\Http\Controllers;

use App\Models\Organizations;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationsController extends Controller
{
    public function index()
    {
        $organizations = Organizations::paginate(15);
        return Inertia::render('organizations/organizationsIndex', [
            'organizations' => $organizations
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
