const express = require('express');
const db = require('../database/database.js');
const seeder = require('../database/seeding.js');
const bodyParser = require('body-parser');
const query = require('../database/query.js');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(cors());
app.use(morgan('tiny'));



//get one item's description
app.get('/description/:productId', (req, res, next) => {
  let productId = req.params.productId;
  query.getDescriptionForOneProduct(productId, (err, description) => {
    if (description.length === 0) {
      res.sendStatus(404);
      next();
    } else {
      res.status(200).send(description);
      next();
    }
  });
});

//get multiple item descriptions
app.post('/description/multiple', (req, res, next) => {
  //will recieve an array of multiple productId
  let productIds = req.body.productIds;
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