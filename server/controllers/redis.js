const redis = require("redis");
const client = new redis.createClient();
const { asyncHandler, ErrAPI } = require('./utils.js');

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

// check cache for a request
exports.getCached = asyncHandler( async (req, res, next) => {
  if(CACHE_UP = false) {
    next();
  }
  const { productId } = req.params;
  // check if  value exists in cache and send if it does
  let cachedResult = JSON.parse(await getter(productId));
  console.log('result', cachedResult)
  // if exists in cache re turn 
  if(cachedResult !== null) {
    res.json(cachedResult);
  } 
  
  // else continue and it will be added in getter
  else next();
});

// function used in endpoints to set results to cache
exports.setCache = async (key, value) => {
  await setter(key, value).catch(err => { throw err });
};

exports.invalidateKey = async (key) => {
  await deleter(key).catch(err => { throw err });
};