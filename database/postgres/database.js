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
const updateQuery = ({table, columns, values, id}) => `
  update ${table}
    set
    ${columns.map((col, i) => {
      return `${col}='${values[i]}'`;
    })}
  where id='${id}'
`;

// const insertQuery 

const queriesTypes = {
  update: updateQuery
}

const combineUpdates = (type, ...queries) => `
  BEGIN
    ${queries.map(query => queriesTypes[type](query)).join('\n')}
  COMMIT;
`;

const q = combineUpdates(
  'update',
  {table:'info', 
  columns: ['brand', 'itemColor'], 
  values: ['a', 'b'], 
  id: '22b8837fc929b21ef4551e1ffa72f485'}
  )//, {table:'test2', columns: ['col', 'test'], values: ['a', 'c'], id: 10})
console.log(q)

exports.getProduct = async (productId) => {
  const q = getProductQuery(productId);
  console.log(q);
  const { rows } = await client.query(q);
  return rows[0];
};

