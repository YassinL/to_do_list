const { ConflictError } = require('../helpers/errors');
const fs = require('fs');
const { pick } = require('lodash');
const bcrypt = require('bcrypt');
const { Users } = require('../models');

const usersAttributes = [
  'firstName',
  'lastName',
  'email',
  'password',
];

module.exports = {
  addUser: async (data) => {
    const { password } = data;
    const addUser = pick(data, usersAttributes);
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await Users.create({
      ...addUser,
      password: hashedPassword,
    });
    return createUser;
  },

  checkEmail: (userEmail) => {
    return Users.findOne({
      attributes: ['email'],
      where: { email: userEmail },
    });
  },
};
