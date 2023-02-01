require('./config/db');

const express = require('express');
const bodyParser = express.json;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser());

module.exports = app;