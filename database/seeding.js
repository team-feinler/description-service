const generateData = require('./data.js');
const mongoose = require('mongoose');
const Description = require('./database.js');

Description.count({}, function(err, count) {
  let fakeData = generateData();
  //Database should hold at most 100 items
  if (count < 100) {
    //seed script to populate DB
    Description.insertMany(fakeData)
      .then(() => console.log('DATA SUCCESSFULLY SEEDED'))
      .catch((err) => console.log('ERROR SEEDING DATA', err))
      .finally(() => mongoose.connection.close());
  } else {
    process.exit();
  }
});
