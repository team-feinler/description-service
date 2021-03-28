const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env')});
const { Client } = require('pg');
const client = new Client();
const md5 = require('md5');

client.connect()

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
// stings must 
const updateQuery = ({table = '', columns = [], values = [], id = ''}) => `
  update ${table}
    set
    ${columns.map((col, i) => {
      return `${col}='${values[i]}'`;
    })}
  where id='${id}';
`;

// reusable insert query
// const insertQuery 

const queriesTypes = {
  update: updateQuery
}

// aggragate all queries into a single string with the appropriate syntax
// use begin and commit to lump into single transaction to ensure integrity
// works for all update, delete, insert
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

exports.updateProduct = async (...queries) => {
  const query = combineQueries('update', ...queries);
  return client.query(query);
}



// for quick debugging purposes
const queries = [
  {
    table:'info', 
    columns: ['brand', 'itemColor'], 
    values: ['a test', 'b'], 
    id: '22b8837fc929b21ef4551e1ffa72f485'
  },
  {
    table:'descriptions', 
    columns: ['itemDescription'], 
    values: [`${JSON.stringify(['a test', 'c'])}`], 
    id: '748a9d8335d2e7d78f8736bd14d4fc65'
  },
  {
    table: 'configurations',
    columns: ['configuration'],
    values: [`${JSON.stringify(['configuration test'])}`],
    id: 'fdf9fcc9c64602ce07972a2673d2eefc'
  },
  {
    table: 'similarItems',
    columns: ['similarItems'],
    values: [`${JSON.stringify([' similar item test'])}`],
    id: '116e28d6472ac75f0fc045e5f39e15f5'
  }
]

// exports.updateProduct(...queries).then(res => console.log(res));

