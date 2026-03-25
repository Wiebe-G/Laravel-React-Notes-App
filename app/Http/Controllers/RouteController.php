<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Inertia\Inertia;

class RouteController extends Controller
{
    public function Dashboard()
    {
        return Inertia::render('dashboard');
    }

    public function Notes()
    {
        return Inertia::render('notes', [
            'notes' => Note::all(),
        ]);
    }
}
