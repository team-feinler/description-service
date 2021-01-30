const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ItemDescription', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: false, poolSize: 10})
  .then((res) => { console.log('MONGO CONNECTED'); })
  .catch(err => console.log(err));

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

module.exports = Description;
