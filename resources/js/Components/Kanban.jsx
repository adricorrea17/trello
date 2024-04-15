import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Task from './Task';

const Kanban = ({ KanbanData, errors, success }) => {
  const [taskNames, setTaskNames] = useState(KanbanData.kanban.map(kanban => kanban.title));
  const [editableTitle, setEditableTitle] = useState('');
  const [selectedPriorityIndex, setSelectedPriorityIndex] = useState(null); 

  function handleDelete(e, kanbanId) {
    e.preventDefault();
    Inertia.post('/delete', { id: kanbanId });
  }

  function handleEditable(e) {
    setEditableTitle(e.target.textContent);
  }

  function handleChange(e, index) {
    const newTaskNames = [...taskNames];
    newTaskNames[index] = e.target.value;
    setTaskNames(newTaskNames);
  }

  function handleTaskCreate(e, kanbanId, index) {
    e.preventDefault();
    const selectedPriority = KanbanData.priorities[selectedPriorityIndex]; 
    Inertia.post('/createTask', { id: kanbanId, taskName: taskNames[index], priority: JSON.stringify(selectedPriority) }); 
  }
  

  function handleEditTitle(id) {
    Inertia.post('/edit', { id: id, title: editableTitle });
  }

  return (
    <div className='grid grid-cols-3 gap-4'>
      {KanbanData.kanban.map((kanban, index) => (
        <div className="bg-gray-700 text-white rounded p-4 shadow" key={kanban.id}>
          <h1 className='text-2xl mb-4' contentEditable suppressContentEditableWarning={true} onKeyUp={handleEditable} onBlur={() => handleEditTitle(kanban.id)}>{kanban.title}</h1>
          {errors && errors.title && (
            <div className="text-red-500">{errors.title}</div>
          )}
          {success && (
            <div className="text-green-500">{success}</div>
          )}
          <form onSubmit={(e) => handleTaskCreate(e, kanban.id, index)} method="post">
            <input placeholder='Agregar Tarea' className='w-full border border-gray-300 p-2 rounded mb-4 text-black' onChange={(e) => handleChange(e, index)} />
            {KanbanData.priorities.map((priority, priorityIndex) => (
              <div key={priorityIndex} className='mb-2 inline mr-2 '>
                <input
                  type="radio"
                  name={`priority_${index}`}
                  value={priorityIndex}
                  id={`priority_${index}_${priorityIndex}`} 
                  onChange={() => setSelectedPriorityIndex(priorityIndex)}
                />
                <label htmlFor={`priority_${index}_${priorityIndex}`}>{priority.label}</label>
              </div>
            ))}
          </form>
          <div>
            {KanbanData.kanban.filter(task => task.id === kanban.id).map(task => (
              <div key={task.id}>
                <Task task={task} priority={KanbanData.priorities} />
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
