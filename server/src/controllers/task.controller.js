const taskService = require('../services/task.service');


const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTaskData();
        res.status(200).send({ tasks });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createTask = async (req, res) => {
    try {
        const newTask = await taskService.createNewTask(req.body);
        res.status(200).send({ message: 'Created new task', newTask })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskService.updateTask(id, req.body);
        res.status(200).send({ message: 'Updated a task', task })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskService.deleteTask(id);
        res.status(200).send({ message: 'Deleted the task', task })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}