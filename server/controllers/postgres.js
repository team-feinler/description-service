const { getProduct, updateProduct, getKeys, deleteProduct, insertProduct } = require('../../database/postgres/database.js');
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
  const {itemDescription, similarItems, configuration, ...info} = req.body;
  const { rows } = await getKeys(req.hash);
  const { isArray } = Array;
  // check body and push to queries if table info present
  let queries = [];
  // check if arrays have content, if so push query object to queries
  //TODO sanitize strings going into keys
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
  const infoKeys = ['brand', 'itemColor', 'itemName', 'isPrimeFreeOneDay', 'isFreeDelivery'];
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
  res.json(product);
});

exports.deleteProduct = asyncHandler( async(req, res, next) => {
  res.json('delete handler')
});

exports.insertProduct = asyncHandler( async(req, res, next) => {
  res.json(req.body);
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


exports.genInsert = asyncHandler((req, res, next) => { // use asyncHandler to handle any errors thrown
  // using an assignable id to maintain continuity of ids
  // will remove this feature when a better system for tracking ids implemented
  if (parseInt(req.params.productId) <= 10000000) {
    throw new ErrAPI('Product id must be greater than 10M', 400, 'genInsert middleware');
  }
  if (!Object.keys(req.body).length) {
    const newDoc = randomDoc(parseInt(req.params.productId));
    req.body = newDoc;
    next();
  } else {
    next();
  }
})




