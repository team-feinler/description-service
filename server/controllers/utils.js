const md5 = require('md5');
const { DESCRIPTION, INFO, SIMILARITEMS, CONFIGURATION } = require('../../database/postgres/data.js');


// async handler that wraps promise with catch block around a function, passes error into next to be handled by error route
exports.asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req,res,next)).catch(next);

// send response back to client on error
exports.errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'There was an error';
  res.status(status).json({status, message});
};

// make custom error that can take message, status, and function from which it is thrown as args 
exports.ErrAPI = class ErrAPI extends Error {
  constructor(message = 'Server error', status = 500, origin = "server") {
    super(message);
    this.status = status;
    this.stack = origin;
  }
};

//create middleware that will hash param and add to req object
const { asyncHandler, ErrAPI } = exports;
exports.hashParam = asyncHandler((req, res, next) => {
  const { productId } = req.params;
  // only ints are valid throw error otherwise
  if(isNaN(parseInt(productId))) {
    throw new ErrAPI('Invalid id', 400, 'hashParam middleware');
  } else {
    //hash id and add to req
    const hash = md5(parseInt(productId));
    req.hash = hash;
    next();
  }
});

exports.generateIds = (index) => {
  const descriptionId = md5(index + DESCRIPTION);
  const infoId = md5(index + INFO);
  const configId = md5(index + CONFIGURATION);
  const itemsId = md5(index + SIMILARITEMS);
  return [descriptionId, infoId, configId, itemsId];
}
