const data = require('./data.js');
const mongoose = require('mongoose');
const Description = require('./database.js');


var fakeData = data.data;

Description.Description.count({}, function(err, count) {
  if (count !== 100) {
    //seed script to populate DB
    Description.Description.insertMany(fakeData)
      .then(() => console.log('DATA SUCCESSFULLY SEEDED'))
      .catch((err) => console.log('ERROR SEEDING DATA', err));
    module.exports.Description = Description;
  }
});