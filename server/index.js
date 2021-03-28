const express = require('express');
require('../database/database.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { descriptionById, descriptionByBatch, newDescription, genData, deleteDescription } = require('./controllers/mongo.js');

const { getProduct, updateProduct, genUpdate, insertProduct, genInsert } = require('./controllers/postgres.js');
const { errorHandler, hashParam } = require('./controllers/utils.js');

const app = express();

//setup middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

// setup up static requests
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


// hash param and add to req
// RUD controllers
app.use('/description/:productId', hashParam);
app.route('/description/:productId')
  .get(getProduct)
  .put(genUpdate, updateProduct)
  .delete(deleteDescription);

// C controller
app.route('/descriptions/new')
  .post(genInsert, insertProduct);

//get multiple item descriptions
app.get('/descriptions/multiple', descriptionByBatch);
app.use(errorHandler);

module.exports = app;