require('dotenv').config('../.env')
const express = require('express');


const middleware = require('./middleware')
const routes = require('./routes')
const { notFoundHandler, errorHandler } = require('./error')

const app = express();

const myDB = require('../db/db');

myDB.create('user1', 10);
myDB.create('user2', 10);
myDB.create('user2', 10);
myDB.bulkCreate('user 5', 10, 20)
const tickets = myDB.find()
// console.log(tickets);
const winners = myDB.draw(2);
// console.log(winners);

app.use(middleware)

app.use(routes)

app.use(notFoundHandler)

app.use(errorHandler)

module.exports = app;