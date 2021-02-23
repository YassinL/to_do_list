const express = require('express');
const {
  addLists,
  deleteLists,
  getAllLists,
  getList,
  updateLists,
} = require('../controllers/lists');
const { ValidationError } = require('../helpers/errors');
const { listValidation } = require('../validators');
const { CREATED, OK } = require('../helpers/status_code');
const listsRouter = express.Router();

const { isAuth } = require('../middlewares');

listsRouter.post('/lists', isAuth, async (request, response) => {
  const list = request.body;
  const errors = listValidation(list);
  if (errors) throw new ValidationError(errors);

  const listAdd = {
    ...request.body,
    urlName: request.body.name.toLowerCase().replace(/ /g, '-'),
  };
  const newList = await addLists(listAdd, request.user.id);
  response.status(CREATED).json(newList);
});

listsRouter.get('/lists', isAuth, async (request, response) => {
  const allLists = await getAllLists(request.body, request.user.id);
  response.status(OK).json(allLists);
});

listsRouter.get('/lists/:id', isAuth, async (request, response) => {
  const list = await getList(request.params.id);
  response.status(OK).json(list);
});

listsRouter.patch('/lists/:id', isAuth, async (request, response) => {
  list = {
    ...request.body,
    urlName: request.body.name.toLowerCase().replace(/ /g, '-'),
  };
  const updateList = await updateLists(list, request.params.id);
  response
    .status(OK)
    .json({ updateList, message: ' la lise a été modifié ' });
});

listsRouter.delete(
  '/lists/:id',
  isAuth,
  async (request, response) => {
    await deleteLists(request.params.id);
    response.status(OK).json({ message: 'la liste a été supprimé' });
  },
);

module.exports = listsRouter;
