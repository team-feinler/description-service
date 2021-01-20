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


module.exports.Description = Description;
module.exports.getDescriptionForOneProduct = getDescriptionForOneProduct;
