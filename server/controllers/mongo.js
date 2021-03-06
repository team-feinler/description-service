const query = require('../../database/query.js');

exports.descriptionById = (req, res, next) => {
  let productId = req.params.productId;
  query.getDescriptionForOneProduct(productId, (err, description) => {
    if (description.length === 0) {
      res.sendStatus(404);
      next();
    } else {
      let itemData = description;
      res.status(200).send(itemData);
      next();
    }
  });
};

exports.descriptionByBatch = (req, res, next) => {
  //will recieve an array of multiple productId
  let productIdsObj = req.query;
  let productIds = Object.values(productIdsObj);
  for (let i = 0; i < productIds.length; i++) {
    productIds[i] = parseInt(productIds[i]);
  }
  query.getDescriptionForMultipleProducts(productIds, (err, descriptions) => {
    if (err) {
      res.sendStatus(404);
      next();
    } else {
      res.status(200).send(descriptions);
      next();
    }
  });
};