import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import React from 'react';
import Task from './Task';

const Kanban = ({ KanbanData }) => {
  const [taskNames, setTaskNames] = useState(Array(KanbanData.kanban.title).fill(''));
  const [editable, setEditable] = useState('');

  function handleDelete(e, kanbanId) {
    e.preventDefault();
    Inertia.post('/delete', { id: kanbanId });
  }

  function handleEditable(e) {
    setEditable(e.target.textContent);
  }

  function handleChange(e, index) {
    const newTaskNames = [...taskNames];
    newTaskNames[index] = e.target.value;
    setTaskNames(newTaskNames);
  }

  function handleTaskCreate(e, kanbanId, index) {
    e.preventDefault();
    Inertia.post('/createTask', { id: kanbanId, taskName: taskNames[index] });
  }

  function handleEditTitle(id) {
    Inertia.post('/edit', { id: id, title: editable });
  }

  return (
    <div className='grid grid-cols-3 gap-4'>
      {KanbanData.kanban.map((kanban, index) => (
        <div className="bg-gray-700 text-white rounded p-4 shadow" key={kanban.id}>
          <h1 className='text-2xl mb-4' contentEditable onKeyUp={handleEditable} onBlur={() => handleEditTitle(kanban.id)}>{kanban.title}</h1>
          <form onSubmit={(e) => handleTaskCreate(e, kanban.id, index)} method="post">
            <input placeholder='Agregar Tarea' className='w-full border border-gray-300 p-2 rounded mb-4 text-black' value={taskNames[index]} onChange={(e) => handleChange(e, index)} />
          </form>
           <div>
            { KanbanData.kanban.filter(task => task.id === kanban.id).map(task => (
              <div>
                <Task key={task.id} task={task}  />
              </div>
            ))}
          </div>
          <form onSubmit={(e) => handleDelete(e, kanban.id)} method="post">
            <button className='bg-red-500 text-white rounded w-full p-2'>Eliminar Kanban</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default Kanban;
