const express = require('express');
const port = 4004;
const app = express();
const db = require('../database/database.js');
const seeder = require('../database/seeding.js');
const bodyParser = require('body-parser');
const query = require('../database/query.js');
const cors = require('cors');
const morgan = require('morgan');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));



//get one item's description
app.get('/description/:productId', (req, res) => {
  let productId = req.params.productId;
  let itemDescription = query.getDescriptionForOneProduct(productId, (err, description) => {
    if (description.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(description);
    }
  });
});

//get multiple item descriptions
app.post('/description/multiple', (req, res) => {
  //will recieve an array of multiple productId
  let productIds = req.body;
  //should I limit the number of product descriptions one can get?
  let multipleItemDescriptions = query.getDescriptionForMultipleProducts(productIds, (err, descriptions) => {
    if (descriptions.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send(descriptions);
    }
    //sends back an array of descriptions
  });
});

app.listen(port, () =>
  console.log(`listening on port ${port}`));

module.exports = app;