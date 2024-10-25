import React from 'react'

export default function InputBar({ newTask, setNewTask, handleSubmit, isEditing }) {

    const handleChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form onSubmit={handleSubmit} className='p-6'>
            <input 
                type="text" 
                name='title' 
                value={newTask.title} 
                placeholder='Caption your task' 
                onChange={handleChange}
                className='border rounded mx-2 py-1 px-3'
            />
            <input 
                type="text" 
                name='description' 
                value={newTask.description} 
                placeholder='Description for your task' 
                onChange={handleChange}
                className='border rounded mx-2 py-1 px-3' 
            />
            <button className='bg-emerald-400 text-white px-2 py-1 rounded' type='submit'>
                {isEditing ? 'Edit a task' : 'Add new task'}
            </button>
        </form>
    )
}
