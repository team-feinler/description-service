const express = require('express');

const db = require('../database/database.js');
const seeder = require('../database/seeding.js');
const bodyParser = require('body-parser');
const query = require('../database/query.js');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();

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


//get one item's description
app.get('/description/:productId', (req, res, next) => {
  let productId = req.params.productId;
  query.getDescriptionForOneProduct(productId, (err, description) => {
    if (description.length === 0) {
      res.sendStatus(404);
      next();
    } else {
      let itemData = description;
      res.status(200).send(itemData);
      next();
    }
  });
});

//get multiple item descriptions
app.get('/descriptions/multiple', (req, res, next) => {
  //will recieve an array of multiple productId
  let productIdsObj = req.query;
  let productIds = Object.values(productIdsObj);
  for (let i = 0; i < productIds.length; i++) {
    productIds[i] = parseInt(productIds[i]);
  }
  let multipleItemDescriptions = query.getDescriptionForMultipleProducts(productIds, (err, descriptions) => {
    if (err) {
      res.sendStatus(404);
      next();
    } else {
      res.status(200).send(descriptions);
      next();
    }
  });
});

module.exports = app;