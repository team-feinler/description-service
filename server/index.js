const express = require('express');
require('../database/database.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { descriptionById, descriptionByBatch, newDescription, genData, updateDescription, genUpdate, deleteDescription } = require('./controllers/mongo.js')

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


// handle endpoints

//get one item's description
app.route('/description/:productId')
  .get(descriptionById)
  .put(genUpdate, updateDescription)
  .delete(deleteDescription);

app.route('/description/new')
  .post(genData, newDescription);

//get multiple item descriptions
app.get('/descriptions/multiple', descriptionByBatch);

module.exports = app;