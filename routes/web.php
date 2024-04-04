<?php

use App\Models\Kanban;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $KanbanTitle = Kanban::all();
    $kanbanTasks = Kanban::with('tasks')->get();
    return Inertia::render('Home', [
        'title' => $KanbanTitle,
        'kanban' => $kanbanTasks
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
    Kanban::find($request->id)->update([
        'title' => $request->title
    ]);
    return redirect('/');
});

Route::post('/createTask', function (Request $request) {
    Kanban::find($request->id)->tasks()->create([
        'title' => $request->taskName
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
