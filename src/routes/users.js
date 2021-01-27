const express = require('express');
const { addUser, checkEmail } = require('../controllers/users');
const {
  ValidationError,
  ConflictError,
} = require('../helpers/errors');
const usersRouter = express.Router();

const { CREATED } = require('../helpers/status_code');
const { userValidation } = require('../validators');

usersRouter.post('/signup', async (request, response) => {
  console.log(request.body);
  const { email } = request.body;

  const user = request.body;

  const errors = userValidation(user);
  if (errors) throw new ValidationError(errors);

  const userFound = await checkEmail(email);
  if (userFound === null) {
    const newUser = await addUser(request.body);
    response.status(CREATED).json(newUser);
  } else {
    throw new ConflictError(
      'Conflit',
      'Un utilisateur utilisant cette adresse email est déjà enregistré',
    );
  }
});

module.exports = usersRouter;
