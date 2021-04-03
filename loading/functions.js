const { productNumberRange } = require('./testConfig.js');

// GET PUT DELETE @ /description/:productId routes
// sets random productId params
function setProductId (requestParams, context, ee, next) {
  const randomProductNumber = Math.floor(Math.random() * productNumberRange);
  const newUrl = `/description/${randomProductNumber}`;
  requestParams.url = newUrl;
  return next()
}

// POST @ /descriptions/new
// creates body for new record
function createBody (requestParams, context, ee, next) {
  // TODO create random doc for insert
  return next();
}

// for testing purposes
function printResponse (requestParams, response, context, ee, next) {
  console.log(requestParams.method);
  return next();
}

module.exports = {
  printResponse,
  createBody,
  setProductId
}