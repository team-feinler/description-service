const redis = require("redis");
const client = new redis.createClient();
const { asyncHandler, ErrAPI } = require('./utils.js');
const TOP = 9350000;
const BOTTOM = 9000000;
// log any error
client.on("error", function(error) {
  console.error(error);
});

// give promise functionality to redis actions
const promisify = fn => (...args) => new Promise((resolve, reject) => {
  fn(...args, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  })
});

//promisify get and set
const getter = promisify(client.get.bind(client));
const setter = promisify(client.set.bind(client));
const deleter = promisify(client.del.bind(client));
const close = promisify(client.quit.bind(client));

const inRange = (productId) => {
  const value = parseInt(productId)
  if (BOTTOM <= value && value <= TOP && !isNaN(value)) {
    return true;
  } else {
    return false;
  }
}

// check cache for a request
exports.getCached = asyncHandler( async (req, res, next) => {
  const { productId } = req.params;
  // check if  value exists in cache and send if it does
  let check = inRange(productId);
  let cachedResult;
  if (check) {
    cachedResult = JSON.parse(await getter(productId));
  }
  // if exists in cache re turn 
  if(check && cachedResult !== null) {
    res.json(cachedResult);
  } 
  
  // else continue and it will be added in getter
  else next();
});

// function used in endpoints to set results to cache
exports.setCache = async (productId, value) => {
  let check = inRange(productId);
  // naive implementation of key control
  if(check) {
    await setter(productId, value).catch(err => { throw err });
  }
};

exports.invalidateKey = async (productId) => {
  let check = inRange(productId);
  // naive implementation of key control
  if(check) {
    await deleter(productId).catch(err => { throw err });
  }
};

exports.close = close;