const express = require('express');
const { addLists } = require('../controllers/lists');
const { CREATED } = require('../helpers/status_code');
const listsRouter = express.Router();

const { isAuth } = require('../middlewares');

listsRouter.post('/lists', isAuth, async (request, response) => {
  const newList = await addLists(request.body, request.user.id);
  response.status(CREATED).json(newList);
});

module.exports = listsRouter;
