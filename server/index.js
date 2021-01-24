const express = require('express');
const port = 4004;
const app = express();
const db = require('../database/database.js');
const seeder = require('../database/seeding.js');
const bodyParser = require('body-parser');
const query = require('../database/query.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//get one item's description
app.get('/description/:productId', (req, res) => {
  let productId = req.params.productId;
  let data = query.getDescriptionForOneProduct(productId, (err, description) => {
    res.status(200).send(description);
  });
});

//get multiple item descriptions

app.listen(port, () =>
  console.log(`listening on port ${port}`));