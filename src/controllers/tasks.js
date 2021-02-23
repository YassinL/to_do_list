const { NotFoundError } = require('../helpers/errors');
const { Lists, Tasks } = require('../models');

const tasksAttributes = ['name', 'description'];

module.exports = {
  addTasks: async (id, data) => {
    const findList = await Lists.findOne({ where: { id } });
    const { name, description } = data;
    const createTasks = await Tasks.create({
      name,
      description,
      listId: findList.id,
    });

    const task = await Tasks.findByPk(createTasks.id, {
      include: [
        {
          model: Lists,
          attributes: ['name'],
          raw: true,
        },
      ],
      attributes: tasksAttributes,
    });
    return task;
  },

  getAllTasks: async (id) => {
    const findList = await Lists.findOne({ where: { id } });
    const allTasks = await Tasks.findAll({
      where: { listId: findList.id },
      order: [['id', 'DESC']],
    });

    if (allTasks.length === 0 || allTasks === null) {
      throw new NotFoundError(
        'Ressources introuvables',
        'Aucune tâches existantes, veuillez en créer une nouvelle. ',
      );
    }
    return allTasks;
  },

  getTask: async (taskId) => {
    const task = await Tasks.findOne({
      where: [{ id: taskId }],
    });
    if (!task) {
      throw new NotFoundError(
        'Ressource introuvable',
        "Cette tâche n'existe pas",
      );
    }
    return task;
  },

  updateTasks: async (data, id) => {
    const taskFound = await Tasks.findOne({
      where: { id: id },
      // attributes: listsAttributes,
      include: [
        {
          model: Lists,
          attributes: ['name'],
          raw: true,
        },
      ],
    });
    if (!taskFound) {
      throw new NotFoundError(
        'Ressource introuvable',
        "Cette liste n'existe pas",
      );
    }
    return taskFound.update(data);
  },

  deleteTask: async (id) => {
    const listFound = await Tasks.findOne({
      where: { id: id },
    });
    if (!listFound) {
      throw new NotFoundError(
        'Ressource introuvable',
        "Cette tâche n'existe pas",
      );
    }
    await Tasks.destroy({
      where: { id: id },
    });
  },
};
