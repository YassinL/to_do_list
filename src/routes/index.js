const express = require('express');
require('express-async-errors');
const router = express.Router();

const userRouter = require('./users');
const listsRouter = require('./lists');

router.use(userRouter);
router.use(listsRouter);

module.exports = router;
