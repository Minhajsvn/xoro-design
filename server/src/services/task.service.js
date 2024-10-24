const Task = require('../models/task.model');


const getTaskData = async () => {
    try {
        const task = await Task.find({});
        return task;
    } catch (error) {
        throw new Error("No Data found in database")
    }
}

const createNewTask = async ({ title, description }) => {
    try {
        const newTask = new Task({ title, description });
        return await newTask.save();
    } catch (error) {
        throw new Error('An error occurred while creating new task')
    }
}

const updateTask = async (id, updates) => {
    try {
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        if(!task){
            throw new Error('Task not founded')
        }
        return task;
    } catch (error) {
        throw new Error('An error occurred while attempting to update the task')
    }
}

const deleteTask = async (id) => {
    try {
        const task = await Task.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if(!task){
            throw new Error('Task not founded')
        }
        return task;
    } catch (error) {
        throw new Error('An error occurred while attempting to delete the task')
    }
}

module.exports = {
    getTaskData,
    createNewTask,
    updateTask,
    deleteTask
}