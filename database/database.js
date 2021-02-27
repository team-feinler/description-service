const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ItemDescription', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: false, poolSize: 10});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


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

module.exports = Description;
