const query = require('../../database/query.js');
const Description = require('../../database/database.js');
const { generateData } = require('../../database/data.js');

// GET @ /description/:productId
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

// GET @ /descriptions/multiple
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

// PUT @ /description/:productId
exports.updateDescription = async (req, res, next) => {
  let { productId } = req.params;
  delete req.body.productId;
  delete req.body._id;
  console.log(req.body)
  try {
    const update = await Description.findOneAndUpdate({ productId }, req.body, { new: true})
    res.json(update);
  } catch (error) {
    console.log(error.message)
    res.status(error.status || 500).json(error);
  }
}

// PUT @ /description/:productId
exports.newDescription = async (req, res, next) => {
  try {
    console.log(req.body.productId)
    const description = await Description.create(req.body);
    res.json(description);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }
}

// DELETE @ /description/:productId
exports.deleteDescription = async (req, res, next) => {
  const { productId } = req.params;
  try {
    await Description.findOneAndDelete({productId});
    res.json(`id ${productId} deleted`);
  } catch (error) {
    res.status(error.status || 500).json(error.message || 'Server error');
  }
}

// Middleware
exports.genData = async (req, res, next) => {
  if(Object.keys(req.body).length === 0) {
    try {
      let newDoc = generateData(1,1)[0];
      let count = await Description.count({});
      delete newDoc.productId;
      newDoc.productId = count + 1
      req.body = newDoc;
      next();
    } catch (error) {
      res.status(error.status || 500).json(error)
    }
  } else {
    next();
  }
}

// middleware
exports.genUpdate = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    try {
      let update = generateData(1,1)[0];
      delete update.productId;
      req.body = update;
      req.body.itemColor = 'This was updated';
      next();
    } catch (error) {
      res.status(error.status || 500).json(error);
    }
  } else {
    next();
  }
}