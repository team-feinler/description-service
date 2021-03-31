const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env')});
const { Client } = require('pg');
const client = new Client();

client.connect();

// get single or batch of products (takes single id or array)
const getProductQuery = (productIds) =>  `
  select 
    products.id as "productId",
    configurations.configuration,
    descriptions.itemDescription as "itemDescription",
    info.itemName as "itemName",
    info.itemColor as "itemColor",
    info.brand,
    info.isPrimeFreeOneDay as "isPrimeFreeOneDay",
    info.isFreeDelivery as "isFreeDelivery",
    similarItems.similarItems as "similarItems"
  from products
  inner join configurations on products.configuration = configurations.id
  inner join descriptions on products.description = descriptions.id
  inner join info on products.info = info.id
  inner join similarItems on products.similarItems = similarItems.id
    ${Array.isArray(productIds) ? `
      where products.id in (${productIds.map(id => `'${id}'`).join(',')})
    ` : `
      where products.id = '${productIds}';
    `}
`;

// get foreign keys from product table
const getProductKeys = (productId) => `
  SELECT 
    products.configuration,
    products.info,
    products.description,
    products.similarItems
  from products
  where products.id = '${productId}';
`;

// build out query templates for CUD
// reusable update table template
// values passed as arrays must be stringified, where is pair of prop='val'
// columns and values must be in same order
const updateQuery = ({table = '', columns = [], values = [], where = [['prop', 'val']]}) => `
  UPDATE ${table}
    SET
    ${columns.map((col, i) => `${col}='${values[i]}'`)}

  WHERE ${where.map(pair => `${pair[0]}='${pair[1]}'`).join(' AND ')};
`;

// reusable insert query
// columns must be in same order as values
const insertQuery = ({table = '', columns = [], values = []}) => `
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

// store different templates to be indexed later
const queriesTypes = {
  update: updateQuery,
  insert: insertQuery,
  delete: deleteQuery
};

// combine query template for each table so all can be changed as same time
// process all queries through template designated by the arg type
// use begin and commit to lump into single transaction to ensure integrity
// works for update, delete, insert
// updates sdc_data on insert and deletes to track record metadata
const combineQueries = (type, ...queries) => `
  BEGIN;
    ${queries.map(query => queriesTypes[type](query)).join('\n')}

    ${type === 'delete' ?  `UPDATE sdc_data
    SET total_records = total_records - 1
    WHERE id = 1;`: ''}

    ${type === 'insert' ? `UPDATE sdc_data
    SET latest_record = latest_record + 1,
        total_records = total_records + 1
    WHERE id = 1;` : ''}

  COMMIT;
`;

// get keys from a product
exports.getKeys = async (productId) => {
  return client.query(getProductKeys(productId));
}

// get products by id, can accept array of product ids or single product id
exports.getProduct = async (productId) => {  
  try {
    const q = getProductQuery(productId);
    const { rows } = await client.query(q);
    // if batch return all rows
    // if(Array.isArray(productId)) return rows;
    //if single return first result
    return rows;
  } catch (error) {
    throw error;
  }
};

// for use in controller, take query objects, combine and resolve
exports.updateProduct = async (...queries) => {
  try {
    const q = combineQueries('update', ...queries);
    return client.query(q);
  } catch (error) {
    await client.query('rollback;');
    throw error;
  }
};

// for use in controller
exports.insertProduct = async(...queries) => {
  try {
    const q = combineQueries('insert', ...queries);
    let res = await client.query(q);
    return res;
  } catch (error) {
    await client.query('rollback;');
    throw error;
  }

};

// delete a product and all related entries
exports.deleteProduct = async (...queries) => {
  try {
    const q = combineQueries('delete', ...queries);
    console.log(q);
    let res = client.query(q);
    return res;
  } catch (error) {
    await client.query('rollback;');
    throw error; 
  }

};

// get last product index inorder to insert new record and use hash of index for id 
exports.getLatest = async () => {
  return (await client.query(`select latest_record from sdc_data where id=1;`)).rows[0].latest_record;
};


// ************************ example and testing below
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

