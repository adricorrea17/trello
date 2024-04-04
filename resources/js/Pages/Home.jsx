import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import Kanban from '../Components/Kanban';

const Home = (KanbanData) => {
    const [values, setValues] = useState({
        Kanban_name: "",
      })
    
      function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
      }
    
      function handleSubmit(e) {
        e.preventDefault()
        router.post('/create', values)
      }
    
      return (
        <div className='container mx-auto mt-10'>
        <form onSubmit={handleSubmit}>
          <input className='w-full border p-2 rounded mb-4' id="Kanban_name" placeholder="Agregar Kanban" onChange={handleChange} />
        </form>

        <div>
            <Kanban KanbanData={KanbanData} />
        </div>
        </div>
      )
}

export default Home;