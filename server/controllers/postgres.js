// TODO validate and sanitize data

const { getProduct, updateProduct, getKeys, deleteProduct, insertProduct, getLatest } = require('../../database/postgres/database.js');
const { asyncHandler, ErrAPI, generateIds } = require('./utils.js');
const { randomDoc } = require('../../database/postgres/data.js');
const md5 = require('md5');
const { setCache, invalidateKey } = require("./redis.js");

// keys for info values to control entries
const infoKeys = ['brand', 'itemColor', 'itemName', 'isPrimeFreeOneDay', 'isFreeDelivery'];

// get a single or batch of product descriptions
exports.getProduct = asyncHandler( async(req, res, next) => {
  const { productId } = req.params;
  const product = await getProduct(req.hash);
  await setCache(productId, JSON.stringify(product));
  res.status(200).json(product);
});

exports.getProductBatch = asyncHandler( async (req, res, next) => {
  const { productIds } = req.body;
  const products = await getProduct(productIds);
  res.status(200).json(products);
});

// takes product.id and updates the corresponding tables
exports.updateProduct = asyncHandler( async(req, res, next) => {
  const { productId } = req.params;
  // get values from req body
  const {itemDescription, similarItems, configuration, ...info} = req.body;
  // get foreign keys for given product id
  const { rows } = await getKeys(req.hash);
  const { isArray } = Array;
  // check body and push to queries if table info present
  let queries = [];
  // check if fields with arrays have content, if so push query object to queries
  if(isArray(itemDescription) && itemDescription.length > 0) {
    queries.push({table: 'descriptions', values: [JSON.stringify(itemDescription)], columns: ['itemDescription'], where: [['id', rows[0].description]]})
  }
  if(isArray(similarItems) && similarItems.length > 0) {
    queries.push({table: 'similarItems', columns: ['similarItems'], values: [JSON.stringify(similarItems)], where: [['id', rows[0].similarItems]]})
  }
  if(isArray(configuration) && configuration.length > 0) {
    queries.push({ table: 'configurations', columns: ['configuration'], values: [JSON.stringify(configuration)], where: [['id', rows[0].configuration]]});
  }

  // check for info keys, if defined, zip keys to values in query object and push to queries
  const infos = {table: 'info', columns: [], values: [], where: [['id', rows[0].info]]};
  infoKeys.forEach(key => {
    if(info && info[key] !== undefined) {
      infos.columns.push(key);
      infos.values.push(info[key]);
    }
  });
  if(infos.values.length) queries.push(infos);

  // update and return res
  await updateProduct(...queries);
  const product = await getProduct(req.hash);
  await invalidateKey(productId);
  res.json(product);
});

// delete a product by id
exports.deleteProduct = asyncHandler( async(req, res, next) => {
  const { productId } = req.params;
  const keys = await getKeys(req.hash);
  if(!keys.rows[0]) throw new ErrAPI('Product does not exist', 404, 'deleteProduct');
  const { configuration, description, info, similaritems } = keys.rows[0]
  const queries = [];
  queries.push({table: 'products', where: [['products.id', req.hash]]});
  queries.push({table: 'descriptions', where: [['descriptions.id', description]]});
  queries.push({table: 'info', where: [['info.id', info]]});
  queries.push({table: 'configurations', where: [['configurations.id', configuration]] });
  queries.push({table: 'similarItems', where: [['similarItems.id', similaritems]]});
 
  const deleted = await deleteProduct(...queries);
  await invalidateKey(productId);
  res.json(deleted);
});

// insert a new product
// works with id param for now because there is no system to track continuity of growing records
// when tracking system implemented will factor out feature
exports.insertProduct = asyncHandler( async(req, res, next) => {
  const { itemDescription, configuration, similarItems, id , ...info } = req.body;
  // get hashed ids with respective keys
  const index = (await getLatest()) + 1;
  const [descriptionId, infoId, configId, itemsId] = generateIds(index);
  const productId = md5(index);
  // build queries to insert
  const queries = [];
  // build each query object and push to queries
  queries.push({table: 'descriptions', columns: ['id', 'itemDescription'], values: [descriptionId, JSON.stringify(itemDescription || [])]});

  queries.push({table: 'configurations', columns: ['id', 'configuration'], values: [configId, JSON.stringify(configuration || [])]});

  queries.push({table: 'similarItems', columns: ['id', 'similarItems'], values: [itemsId, JSON.stringify(similarItems || [])]});

  // build info query object and push to queries
  const infoQuery = {table: 'info', columns: ['id'], values: [infoId]};
  infoKeys.forEach(key => {
    infoQuery.columns.push(key);
    if (key === 'isPrimeFreeOneDay' || key == 'isFreeDelivery') {
      infoQuery.values.push(info[key] || false);
    } else {
      infoQuery.values.push(info[key] || '');
    }
  });

  queries.push(infoQuery);

  // build and push products query object
  queries.push({ table: 'products', columns: ['id', 'description', 'similarItems', 'info', 'configuration'], values: [productId, descriptionId, itemsId, infoId, configId ]});

  // resolve all queries at once
  const insert = await insertProduct(...queries);
  res.status(200).json(insert);
})

// create random data for update if req.body is empty(for testing)
exports.genUpdate = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    const {id, ...update} = randomDoc(parseInt(req.params.productId));
    req.body = update;
    next();
  } else {
    next();
  }
};

// middleware to generate random data for insert
// uses getLatest for random data generation
exports.genInsert = asyncHandler( async (req, res, next) => { // use asyncHandler to handle any errors thrown
  if (!Object.keys(req.body).length) {
    const latest = (await getLatest()) + 1;
    const newDoc = randomDoc(latest);
    req.body = newDoc;
    next();
  } else {
    next();
  }
});

// hash productIds from ints
exports.hashProductIds = (req, res, next) => {
  const { productIds } = req.body;
  if(productIds && productIds.length) {
    req.body.productIds = productIds.map(int => md5(int));
  }
  next();
}

// middleware to generate random batch of productIds for batch search
exports.genBatch = asyncHandler( async (req, res, next) => {
  if(req.body.productIds === undefined) {
    let amount = Math.floor(Math.random() * 5);
    let limit = await getLatest();
    const productIds = [];
    for(let i = 0; i <= amount; i++) {
      const id = Math.floor(Math.random() * limit);
      productIds.push(md5(id));
    }
    req.body.productIds = productIds;
  } 
  next();
});





