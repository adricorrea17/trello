<?php

use App\Models\Kanban;
use App\Models\Task;
use App\Priority;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $KanbanTitle = Kanban::all();
    $kanbanTasks = Kanban::with('tasks')->get();
    return Inertia::render('Home', [
        'title' => $KanbanTitle,
        'kanban' => $kanbanTasks,
        'priorities' => Priority::all()
    ]);
});
Route::post('/create', function (Request $request) {
    Kanban::create([
        'title' => $request->Kanban_name
    ]);
    return redirect('/');
});

Route::post('/delete', function (Request $request) {
    Kanban::find($request->id)->delete();
    return redirect('/');
});

Route::post('/edit', function (Request $request) {
    $request->validate([
        'title' => 'required|string',
    ]);

    if ($request->has('title')) {
        $kanban = Kanban::find($request->id);

        if ($kanban) {
            $kanban->title = $request->title;
            $kanban->save();
        } else {
            return redirect('/')->with('error', 'Kanban no encontrado');
        }
    } else {
        return redirect('/')->with('error', 'El título no puede estar vacío');
    }

    return redirect('/')->with('success', 'Título actualizado correctamente');
});


Route::post('/createTask', function (Request $request) {
    Kanban::find($request->id)->tasks()->create([
        'title' => $request->taskName,
        'priority' => $request->priority

    ]);
    return redirect('/');
});

Route::post('/completeTask', function (Request $request) {
    $task = Task::find($request->id);

    if ($task->status == 1) {
        $task->update(['status' => 0]);
    } elseif ($task->status == 0) {
        $task->update(['status' => 1]);
    }
    return redirect('/');
});

Route::post('/deleteTask', function (Request $request) {
    Task::find($request->id)->delete();
    return redirect('/');
});
