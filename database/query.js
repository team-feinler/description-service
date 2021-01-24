const db = require('./database.js');
const Description = require('./database.js');


const getDescriptionForOneProduct = (id, callback) => {
  Description.find({productId: id}, function(err, description) {
    if (err) {
      console.log(err);
    } else {
      callback(null, description);
    }
  });
};

const getDescriptionForMultipleProducts = (ids, callback) => {
  Description.find({productId: { $in: ids } }, function(err, descriptions) {
    if (err) {
      console.log(err);
    } else {
      callback(null, descriptions);
    }
  });
};


module.exports = {
  getDescriptionForOneProduct: getDescriptionForOneProduct,
  getDescriptionForMultipleProducts: getDescriptionForMultipleProducts
};