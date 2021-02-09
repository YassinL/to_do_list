const { request, response } = require('express');
const express = require('express');
const {
  addLists,
  deleteLists,
  getAllLists,
  getList,
  updateLists,
} = require('../controllers/lists');
const { CREATED, OK } = require('../helpers/status_code');
const listsRouter = express.Router();

const { isAuth } = require('../middlewares');

listsRouter.post('/lists', isAuth, async (request, response) => {
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

listsRouter.get(
  '/lists/:urlName',
  isAuth,
  async (request, response) => {
    const list = await getList(request.params.urlName);
    response.status(OK).json(list);
  },
);

listsRouter.patch(
  '/lists/:urlName',
  isAuth,
  async (request, response) => {
    list = {
      ...request.body,
      urlName: request.body.name.toLowerCase().replace(/ /g, '-'),
    };
    const updateList = await updateLists(
      list,
      request.params.urlName,
    );
    response
      .status(OK)
      .json({ updateList, message: ' la lise a été modifié ' });
  },
);

listsRouter.delete(
  '/lists/:urlName',
  isAuth,
  async (request, response) => {
    await deleteLists(request.params.urltName);
    response.status(OK).json({ message: 'la liste a été supprimé' });
  },
);

module.exports = listsRouter;
