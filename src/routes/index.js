const express = require('express');
require('express-async-errors');
const router = express.Router();

const userRouter = require('./users');
const listsRouter = require('./lists');
const tasksRouter = require('./tasks');

router.use(userRouter);
router.use(listsRouter);
router.use(tasksRouter);

module.exports = router;
