/* eslint-disable no-console*/

const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
// const connection = require('./middleware/connection');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(notFound);

app.use(handler);

module.exports = app;
