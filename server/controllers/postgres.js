const { getProduct } = require('../../database/postgres/database.js');
const { asyncHandler, ErrAPI } = require('./utils.js');
const { randomDoc } = require('../../database/postgres/data.js');

exports.getProduct = asyncHandler( async(req, res, next) => {
  console.log('at controller')
  const product = await getProduct(req.hash);
  console.log('product fetched');
  res.status(200).json(product);
});

// takes product.id and updates the corresponding tables
exports.updateProduct = asyncHandler( async(req, res, next) => {
  const { itemDescription, configuration, similarItems, id, ...info} = req.body;
  console.log(itemDescription, configuration, similarItems, info);
  res.json(req.body);
});

// create random data for update if req.body is empty(for testing)
exports.genUpdate = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    const {id, ...update} = randomDoc(parseInt(req.params.productId));
    req.body = update;
    next();
  } else {
    next();
  }
}



