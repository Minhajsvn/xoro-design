import { useEffect, useState } from 'react'
import './App.css'
import InputBar from './components/InputBar';
import axios from 'axios'
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8082/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error({ message: error.message });
    }
  }

  const createNewTasks = async (data) => {
    try {
      const response = await axios.post('http://localhost:8082/tasks', data);
      // console.log(response.data);
      setTasks((prevState) => [...prevState, response.data.task]);
    } catch (error) {
      console.error({ message: error.message });
    }
  }
  
  const updateTask = async (id, updates) => {
    try {
      const response = await axios.put(`http://localhost:8082/tasks/${id}`, updates);
      setTasks((prevState) =>
        prevState.map((task) => 
          task._id === id ? { ...task, ...response.data.task } : task
        )
      );
    } catch (error) {
      console.error({ message: error.message });
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8082/tasks/${id}`);
      console.log(response);
      setTasks((prevState) =>
        prevState.filter((task) => task._id !== id )
      );
    } catch (error) {
      console.error({ message: error.message });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isEditing){
      updateTask(currentTaskId, newTask);
      setIsEditing(false);
      setNewTask({
        title: '',
        description: ''
      })

    }else{
      createNewTasks(newTask);
      setNewTask({
        title: '',
        description: ''
      })

    }
  }

  const handleEditClick = (task) => {
    setIsEditing(true);
    setCurrentTaskId(task._id);
    setNewTask({ title: task.title, description: task.description });
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  return (
      <div className='flex justify-center items-center flex-col'>
        <h1 className='text-2xl font-semibold py-5'>Todo Application</h1>
        <InputBar newTask={newTask} setNewTask={setNewTask} handleSubmit={handleSubmit} isEditing={isEditing} />
        <TaskList tasks={tasks} onEdit={handleEditClick} onDelete={deleteTask} />
      </div>
  )
}

export default App
