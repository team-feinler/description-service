const db = require('./database.js');
const Description = require('./database.js');


const getDescriptionForOneProduct = (id, callback) => {
  Description.find({productId: id}, function(err, description) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, description);
    }
  });
};

const getDescriptionForMultipleProducts = (ids, callback) => {
  Description.find({productId: { $in: ids } }, function(err, descriptions) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, descriptions);
    }
  });
};


module.exports = {
  getDescriptionForOneProduct: getDescriptionForOneProduct,
  getDescriptionForMultipleProducts: getDescriptionForMultipleProducts
};