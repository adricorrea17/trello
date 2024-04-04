<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'status',
        'kanban_id'
    ];

    public function kanban()
    {
        return $this->belongsTo(Kanban::class);
    }
}
