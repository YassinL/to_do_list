const express = require('express');
require('express-async-errors');
const router = express.Router();

const userRouter = require('./users');

router.use(userRouter);

module.exports = router;
