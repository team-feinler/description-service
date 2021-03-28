const { getProduct } = require('../../database/postgres/database.js');
const { asyncHandler, ErrAPI } = require('./utils.js');



exports.getProduct = asyncHandler( async(req, res, next) => {
  console.log('at controller')
  const product = await getProduct(req.hash);
  console.log('product fetched');
  res.status(200).json(product);
});



