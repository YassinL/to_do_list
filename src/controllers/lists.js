const { Lists, Users } = require('../models');

module.exports = {
  addLists: async (data, userId) => {
    const { name } = data;
    const createList = await Lists.create({
      name,
      userId: userId,
    });

    const list = await Lists.findByPk(createList.id, {
      include: [
        {
          model: Users,
          attributes: ['lastName', 'firstName'],
        },
      ],
      attributes: ['name'],
    });
    return list;
  },
};
