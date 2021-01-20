const express = require('express');
const port = 4004;
const app = express();
const db = require('../database/database.js');
const seeder = require('../database/seeding.js');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/description/1000', (req, res) => {
  var data = db.getDescriptionForOneProduct(1000, (err, description) => {
    res.send(description);
  });
});

app.listen(port, () =>
  console.log(`listening on port ${port}`));