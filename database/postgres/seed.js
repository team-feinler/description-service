const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env')});
//pg setup
const { Client } = require('pg');
const format = require('pg-format');
const client = new Client();
// premade raw queries
const { 
  productTable, 
  descriptionsTable, 
  infoTable, 
  configurationsTable, 
  similarItemsTable,
  dropTables,
  addForeignKeys,
  pgRecord
} = require('./queries.js');

// simplify connections for export in testing
const connect = () => client.connect();
const disconnect = () => client.end();

//drop and recreate tables
const dropExistingTables = () => client.query(dropTables);
const createTables = () => new Promise(async (resolve, reject) => {
  try {
    await client.query(descriptionsTable);
    await client.query(infoTable);
    await client.query(configurationsTable);
    await client.query(similarItemsTable);
    await client.query(productTable);
    resolve()  
  } catch (error) {
    reject(error);
  }
})
  .catch(err => console.log(err))

// generate data and save to tables
const seed = async (numOfRecords = 1000, batchSize = 1000) => {
  try {
    const timestamp = Date.now();
    await connect();
    await dropExistingTables();
    await createTables();
    let itemsBuffer = [];
    let descriptionBuffer = [];
    let infoBuffer = [];
    let configurationBuffer = [];
    let productBuffer = [];
    let counter = 0;
    // open a single transaction to avoid commits
    await client.query('BEGIN');
    for(let i = 1; i <= numOfRecords; i++) {
      // get values from record converter
      let { similarItemsValues, descriptionValues, productValues, infoValues, configurationValues } = pgRecord(i);

      // push values up to buffers
      itemsBuffer.push(similarItemsValues);
      descriptionBuffer.push(descriptionValues);
      infoBuffer.push(infoValues);
      configurationBuffer.push(configurationValues);
      productBuffer.push(productValues);

      counter++;
      // when counter reaches batch size insert rows and clear buffers
      if (counter === batchSize || (i === numOfRecords && counter !== 0)) {
        // use pg-format to make write a batch insert, query it and empty buffers
        const items = format('INSERT INTO similarItems (id, product, similarItems) VALUES %L', itemsBuffer);
        await client.query(items);
        itemsBuffer = [];

        const descriptions = format('INSERT INTO descriptions(id, product, itemDescription) VALUES %L', descriptionBuffer);
        await client.query(descriptions);
        descriptionBuffer = [];

        const info = format('INSERT INTO info(id, product, itemColor, brand, isPrimeFreeOneDay, isFreeDelivery) VALUES %L', infoBuffer);
        await client.query(info);
        infoBuffer = [];

        const configuration = format('INSERT INTO configurations(id, product, configuration) VALUES %L', configurationBuffer);
        await client.query(configuration);
        configurationBuffer = [];

        const product = format('INSERT INTO products(id, description, info, configuration, similarItems) VALUES %L', productBuffer);
        await client.query(product);
        productBuffer = [];
        counter = 0;
      }
    }
    // build foreign key index
    await client.query(addForeignKeys);
    // close commit
    await client.query('COMMIT');
    console.log((Date.now() - timestamp) / 1000);
    await disconnect();    
  } catch (error) {
    console.log(error)
    await disconnect()
  }
}

seed(100000, 1000);