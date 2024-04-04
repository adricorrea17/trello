import React from 'react';
import { Inertia } from '@inertiajs/inertia';
const Task = (task) => {
    function handleComplete(id) {
        Inertia.post('/completeTask', { id: id });
    }

    function handleDelete(id) {
        Inertia.post('/deleteTask', { id: id });
    }
    return (
        <div>
            {
                task.task.tasks.map((task) => (
                    <div className={`${task.status === 1 ? 'bg-gray-200' : 'bg-gray-800 drop-shadow-xl'} text-black rounded p-4 shadow mb-4 grid grid-cols-4`}>
                        <h2 className={`text-lg ${task.status === 1 ? 'text-gray-400 line-through' : 'text-white'}`}>{task.title}</h2>
                        <p className='text-2xl'>
                            {task.status === 1 ? '😊' : '🤨'}
                        </p>
                        <button className='ml-2 bg-green-500 text-white rounded' onClick={() => handleComplete(task.id)}>Completar</button>
                        <button className='ml-2 bg-red-500 text-white rounded ' onClick={() => handleDelete(task.id)}>Eliminar</button>
                    </div>
                ))
            }
        </div>
    );
}

export default Task;
