const db = require('./database.js');
const Description = require('./database.js');


var getDescriptionForOneProduct = (id, callback) => {
  Description.find({productId: id}, function(err, description) {
    if (err) {
      console.log(err);
    } else {
      callback(null, description);
    }
  });
};


module.exports.getDescriptionForOneProduct = getDescriptionForOneProduct;