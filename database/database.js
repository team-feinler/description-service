const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ItemDescription', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('CONNECTED TO MONGO');
});

const data = require('./data.js');



var fakeData = data.data;

// db.Description.insertMany(fakeData)
//   .then(function() {
//     console.log('DATA SUCCESSFULLY INSERTED');
//   }).catch(function(error) {
//     console.log('ERROR INSERTING DATA');
//   });

// var fakeData = data.generateData();
// console.log(fakeData);
// const seeder = require('./seeding.js');
// console.log(seeder);

const descriptionSchema = new mongoose.Schema({
  productId: Number,
  itemName: String,
  itemDescription: Array,
  itemColor: String,
  availableColors: Array,
  configuration: Array,
  brand: String,
  isPrimeFreeOneDay: Boolean,
  isFreeDelivery: Boolean
});

const Description = mongoose.model('Description', descriptionSchema);

//seed script to populate DB
Description.insertMany(fakeData);

module.exports.Description = Description;
