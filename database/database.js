const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ItemDescription', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('CONNECTED TO MONGO');
});


const descriptionSchema = new mongoose.Schema({
  productId: Number,
  itemName: String,
  itemDescription: Array,
  itemColor: String,
  similarItems: Array,
  configuration: Array,
  brand: String,
  isPrimeFreeOneDay: Boolean,
  isFreeDelivery: Boolean
});

const Description = mongoose.model('Description', descriptionSchema);

const data = require('./data.js');
var fakeData = data.data;
//seed script to populate DB
Description.insertMany(fakeData)
  .then(() => console.log('DATA SUCCESSFULLY SEEDED'))
  .catch((err) => console.log('ERROR SEEDING DATA', err));
module.exports.Description = Description;
