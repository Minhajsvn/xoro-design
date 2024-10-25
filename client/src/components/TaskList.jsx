import React, { useEffect } from 'react'

export default function TaskList({ tasks = [], onEdit, onDelete }) {

    return (
        <div>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <div className='flex justify-between items-center w-full py-3 px-6 my-3 bg-slate-100 rounded-md' key={task._id}>
                        <div className='px-4 py-2'>
                            <h4 className='font-semibold'>{task.title}</h4>
                            <p>{task.description}</p>
                        </div>
                        <div className='flex'>
                            <button 
                                className='bg-cyan-600 text-white px-2 py-1 rounded mr-2 mb-2 sm:mb-0'
                                onClick={() => {onEdit(task)}}
                            >
                            Edit
                            </button>
                            <button 
                                className='bg-red-600 text-white px-2 py-1 rounded'
                                onClick={async () => { await onDelete(task._id)}}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    )
}
