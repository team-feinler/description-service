const mongoose = require('mongoose');
const Description = require('./database.js');
const data = require('./data.js');
const db = require('./database.js');

console.log('here');

Description.insertMany(data)
  .then(function() {
    console.log('DATA SUCCESSFULLY INSERTED');
  }).catch(function(error) {
    console.log('ERROR INSERTING DATA');
  });