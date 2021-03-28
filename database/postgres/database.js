const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env')});
const { Client } = require('pg');
const client = new Client();
const md5 = require('md5');

client.connect();

// get single product
const getProductQuery = (productId) =>  `
  select 
    configurations.configuration,
    descriptions.itemDescription,
    info.itemName,
    info.itemColor,
    info.brand,
    info.isPrimeFreeOneDay,
    info.isFreeDelivery,
    similarItems.similarItems
  from products
  inner join configurations on products.configuration = configurations.id
  inner join descriptions on products.description = descriptions.id
  inner join info on products.info = info.id
  inner join similarItems on products.similarItems = similarItems.id
  where products.id = '${productId}';
`;

// build out query templates for CUD
// reusable update table template
// arrays passed as values must be stringified, where is pair of prop='val'
// columns and values must be in same order
const updateQuery = ({table = '', columns = [], values = [], where = [['prop', 'val']]}) => `
  UPDATE ${table}
    SET
    ${columns.map((col, i) => `${col}='${values[i]}'`)}

  WHERE ${where.map(pair => `${pair[0]}='${pair[1]}'`).join(' AND ')};
`;

// reusable insert query
const insertQuery = ({table = '', columns = [], values = [], id = ''}) => `
  INSERT INTO ${table}
    (${columns.join(',')})
  VALUES(${values.map(val => `'${val}'`).join(',')});
`;

// reusable delete query
// where is prop=val tuple
const deleteQuery = ({table = '', where = [['prop', 'val']]}) => `
  DELETE FROM ${table}
  WHERE ${where.map(tup => `${tup[0]}='${tup[1]}'`).join(' AND ')};
`;

const queriesTypes = {
  update: updateQuery,
  insert: insertQuery,
  delete: deleteQuery
};

// aggragate all queries into a single string with the appropriate syntax
// use begin and commit to lump into single transaction to ensure integrity
// works for update, delete, insert
const combineQueries = (type, ...queries) => `
  BEGIN;
    ${queries.map(query => queriesTypes[type](query)).join('\n')}
  COMMIT;
`;

// get single product description by id
exports.getProduct = async (productId) => {
  const q = getProductQuery(productId);
  console.log(q);
  const { rows } = await client.query(q);
  return rows[0];
};

// for use in controller, take query objects, combine and resolve
exports.updateProduct = async (...queries) => {
  const query = combineQueries('update', ...queries);
  return client.query(query);
};

// for use in controller
exports.insertProduct = async(...queries) => {
  const q = combineQueries('insert', ...queries);
  return client.query(query);
};

// quick example and testing below
const queries = [
  {
    table:'info', 
    columns: ['brand', 'itemColor'], 
    values: ['a test', 'b'], 
    where: [['id', '22b8837fc929b21ef4551e1ffa72f485']]
  },
  {
    table:'descriptions', 
    columns: ['itemDescription'], 
    values: [JSON.stringify(['a test', 'c'])], 
    where: [['id','748a9d8335d2e7d78f8736bd14d4fc65']]
  },
  {
    table: 'configurations',
    columns: ['configuration'],
    values: [JSON.stringify(['configuration test'])],
    where: [['id','fdf9fcc9c64602ce07972a2673d2eefc']]
  },
  {
    table: 'similarItems',
    columns: ['similarItems'],
    values: [JSON.stringify(['tuple test'])],
    where: [['id','116e28d6472ac75f0fc045e5f39e15f5']]
  }
];
// *** uncomment below to test in shell
// const q = combineQueries('update', ...queries);
// const i = combineQueries('insert', ...queries);

// console.log(q)
// console.log(i);

// exports.updateProduct(...queries).then(res => console.log(res));

