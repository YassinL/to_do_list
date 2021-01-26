const express = require('express');
const usersRouter = express.Router();

usersRouter.post('/signup', async(request, response) => {
  return response.render("HELLO ce sera la route pour l'inscription")
})