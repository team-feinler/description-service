const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ItemDescription');

let descriptionSchema = mongoose.Schema({
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

let Description = mongoose.model('Description', descriptionSchema);

