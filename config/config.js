require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'toDoList_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3306',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'toDoList_test',
    host: '127.0.0.1',
    dialect: ' mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'toDoList_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};