const { NotFoundError } = require('../helpers/errors');
const { Lists, Users } = require('../models');
const { getUserById, getUserByEmail } = require('./users');

const listsAttributes = ['name', 'urlName'];

module.exports = {
  addLists: async (data, userId) => {
    const { name, urlName } = data;
    const createList = await Lists.create({
      name,
      urlName,
      userId: userId,
    });

    const list = await Lists.findByPk(createList.id, {
      include: [
        {
          model: Users,
          attributes: ['email'],
          raw: true,
        },
      ],
      attributes: listsAttributes,
    });
    return list;
  },

  getAllLists: async (data, userId) => {
    const findList = await Lists.findAll({
      where: { userId: userId },
      include: [
        {
          model: Users,
          attributes: ['email'],
          raw: true,
        },
      ],
      attributes: listsAttributes,
    });

    if (findList.length === 0 || findList === null) {
      throw new NotFoundError(
        'Ressources introuvables',
        'Aucune listes existantes, veuillez en créer une nouvelle. ',
      );
    }

    return findList;
  },

  getList: async (urlName) => {
    const list = await Lists.findOne({
      where: { urlName: urlName },
      attributes: listsAttributes,
      include: [
        {
          model: Users,
          attributes: ['email'],
          raw: true,
        },
      ],
    });
    if (!list) {
      throw new NotFoundError(
        'Ressource introuvable',
        "Cette liste n'existe pas",
      );
    }
    return list;
  },

  deleteLists: async (urlName) => {
    const listFound = await Lists.findOne({
      where: { urlName: urlName },
    });
    if (!listFound) {
      throw new NotFoundError(
        'Ressource introuvable',
        "Cette liste n'existe pas",
      );
    }
    await Lists.destroy({
      where: { urlName: urlName },
    });
  },

  updateLists: async (data, urlName) => {
    const listFound = await Lists.findOne({
      where: { urlName: urlName },
      // attributes: listsAttributes,
      include: [
        {
          model: Users,
          attributes: ['email'],
          raw: true,
        },
      ],
    });
    if (!listFound) {
      throw new NotFoundError(
        'Ressource introuvable',
        "Cette liste n'existe pas",
      );
    }
    return listFound.update(data);
  },
};
