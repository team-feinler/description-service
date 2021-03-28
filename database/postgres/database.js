const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env')});
const { Client } = require('pg');
const client = new Client();

client.connect()

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

const updateQuery = (productId, update) => {
  console.log(update);
  return true;
}


exports.getProduct = async (productId) => {
  const q = getProductQuery(productId);
  console.log(q);
  const { rows } = await client.query(q);
  return rows[0];
};

