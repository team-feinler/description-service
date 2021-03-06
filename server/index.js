const express = require('express');

const db = require('../database/database.js');
const bodyParser = require('body-parser');
const query = require('../database/query.js');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();

const controllers = require('./controllers/mongo.js');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());


app.get('*.js', function(req, res, next) {
  if (req.header('Accept-Encoding').includes('br')) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  }
  next();
});

app.use(express.static(__dirname + '/../public'));
app.use('/:id', express.static(__dirname + '/../public'));

const { descriptionById, descriptionByBatch } = controllers

//get one item's description
app.get('/description/:productId', descriptionById);

//get multiple item descriptions
app.get('/descriptions/multiple', descriptionByBatch);

module.exports = app;