const express = require('express');
const {
  addTasks,
  getAllTasks,
  getTask,
  deleteTask,
} = require('../controllers/tasks');
const {
  ValidationError,
  ConflictError,
} = require('../helpers/errors');
const { CREATED, OK } = require('../helpers/status_code');
const tasksRouter = express.Router();

const { isAuth } = require('../middlewares');

tasksRouter.post(
  '/tasks/:listId',
  isAuth,
  async (request, response) => {
    const errors = userValidation(user);
    if (errors) throw new ValidationError(errors);

    const newTask = await addTasks(
      request.params.listId,
      request.body,
    );
    response.status(CREATED).json(newTask);
  },
);

tasksRouter.get(
  '/tasks/:listId',
  isAuth,
  async (request, response) => {
    const tasks = await getAllTasks(request.params.listId);
    response.status(OK).json(tasks);
  },
);

tasksRouter.get(
  '/tasks/:listId/:id',
  isAuth,
  async (request, response) => {
    console.log(request.params);
    const task = await getTask(request.params.id);
    response.status(OK).json(task);
  },
);

tasksRouter.delete(
  '/tasks/:listId/:id',
  isAuth,
  async (request, response) => {
    await deleteTask(request.params.id);
    response.status(OK).json({ message: 'la tâche a été supprimé' });
  },
);

module.exports = tasksRouter;
