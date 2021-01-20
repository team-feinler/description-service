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

//get Data for one product by using productId
var getDescriptionForOneProduct = (id, callback) => {
  Description.find({productId: id}, function(err, description) {
    if (err) {
      console.log(err);
    } else {
      callback(null, description);
    }
  });
};


module.exports = Description;
module.exports.getDescriptionForOneProduct = getDescriptionForOneProduct;
