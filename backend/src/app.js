'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const router = express.Router();
const morgan = require('morgan')

var corsOptions = { origin: '*', optionsSuccessStatus: 200 }

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const Estado = require('../models/Estado');
const Cidade = require('../models/Cidade');

const cidadeRoute = require('../routes/cidade-route');
const estadoRoute = require('../routes/estado-route');

app.use(cors(corsOptions));

app.use(bodyParser.json({
  limit: '50mb', extended: true
}));
app.use(bodyParser.urlencoded({
  limit: '50mb', extended: true
}));
app.use(morgan('combined'));

app.use('/cidade', cidadeRoute);
app.use('/estado', estadoRoute);

module.exports = app;
