const express = require('express');
const port = 4004;
const app = express();
const db = require('../database/database.js');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`listening on port ${port}`));