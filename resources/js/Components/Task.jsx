import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Task = ( task ) => {
  function handleComplete(id) {
    Inertia.post('/completeTask', { id });
  }

  function handleDelete(id) {
    Inertia.post('/deleteTask', { id });
  }

  return (
    <div>
      {task.task.tasks.map((taskItem) => (
        <div className={`${taskItem.status === 1 ? 'bg-gray-200' : 'bg-gray-800 drop-shadow-xl'} text-black rounded p-4 shadow mb-4 grid grid-cols-4`} key={taskItem.id}>
          <h2 className={`text-lg ${taskItem.status === 1 ? 'text-gray-400 line-through' : 'text-white'}`}>{taskItem.title}</h2>
          <p className='text-2xl'>{taskItem.status === 1 ? '😊' : '🤨'}</p>
          
          {taskItem.priority && taskItem.priority.icon && (
            <div dangerouslySetInnerHTML={{ __html: taskItem.priority.icon }} />
          )}
          <button className='ml-2 bg-green-500 text-white rounded' onClick={() => handleComplete(taskItem.id)}>Completar</button>
          <button className='ml-2 bg-red-500 text-white rounded' onClick={() => handleDelete(taskItem.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default Task;
