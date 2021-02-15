const express = require('express');
const {
  addUser,
  checkEmail,
  login,
} = require('../controllers/users');
const {
  ValidationError,
  ConflictError,
} = require('../helpers/errors');
const usersRouter = express.Router();

const { CREATED, OK } = require('../helpers/status_code');
const { isAuth } = require('../middlewares');
const { userValidation } = require('../validators');

usersRouter.post('/signup', async (request, response) => {
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

usersRouter.post('/signin', async (request, response) => {
  const { email, password } = request.body;
  const token = await login(email, password);
  response.status(OK).json({ token });
});

module.exports = usersRouter;
