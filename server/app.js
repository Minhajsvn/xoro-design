const express = require('express');
const routes = require('./src/routes/task.route');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());

app.use('/', routes);

module.exports = app;