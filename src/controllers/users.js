const { UnAuthorizedError } = require('../helpers/errors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { pick } = require('lodash');
const bcrypt = require('bcrypt');

const { Users } = require('../models');

const usersAttributes = [
  'id',
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

  login: async (email, password) => {
    const userFound = await Users.findOne({
      where: { email },
      attributes: usersAttributes,
      raw: true,
      logging: false,
    });

    if (!userFound) {
      throw new UnAuthorizedError(
        'Utilisateur non authentifié ',
        "Le nom d'utilisateur n'est pas correct",
      );
    }

    const comparePassword = await bcrypt.compare(
      password,
      userFound.password,
    );
    if (!comparePassword) {
      throw new UnAuthorizedError(
        'Utilisateur non authentifié ',
        "Le mot de passe n'est pas correct",
      );
    }

    const secretKey = process.env.JWT_SIGN_SECRET;
    const token = jwt.sign(
      {
        email: userFound.email,
        id: userFound.id,
      },
      secretKey,
      {
        expiresIn: '24h',
      },
    );
    return token;
  },
};
