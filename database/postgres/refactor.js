// hash for making ids
const md5 = require('md5');
// new bulk inserter
const {bulk, dropTables } = new require('./model');
const { products, descriptions, configurations, info, similarItems} = require('./data');

//convenience
const { log } = console;




const seed = async () => {


  bulk.addTable('products', products);
  bulk.addTable('descriptions', descriptions);
  bulk.addTable('configurations', configurations);
  bulk.addTable('info', info);
  bulk.addTable('similarItems', similarItems);


  const start = Date.now();
  const [,,total, batch] = process.argv;
  try {
    await bulk.connect();
    // drop product table in case it exists so that other tables can be reset
    await bulk.dropTable("products").catch(err => log(err.message));

    await bulk.bulkInsert("info", parseInt(total), parseInt(batch));
    await bulk.bulkInsert("descriptions", parseInt(total), parseInt(batch));
    await bulk.bulkInsert("configurations", parseInt(total), parseInt(batch));
    await bulk.bulkInsert("similarItems", parseInt(total), parseInt(batch));
    await bulk.bulkInsert("products", parseInt(total), parseInt(batch));

    await bulk.disconnect();
    log(`Done @ ${(start - Date.now()) / 1000} seconds`);
  } catch (error) {
    log(error.message);
    log(`Error at ${(start - Date.now()) / 1000}`);
    await bulk.disconnect();
  }
}

seed();




