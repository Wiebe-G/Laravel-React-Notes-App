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
        $notes = Note::all()->where('user_id', auth()->id())->sortByDesc('created_at')->values();

        return Inertia::render('notes', [
            'notes' => $notes,
        ]);
    }
}
