const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env')});
//pg setup
const { Client } = require('pg');
const client = new Client();
// premade raw queries
const { 
  productTable, 
  descriptionsTable, 
  infoTable, 
  configurationsTable, 
  similarItemsTable,
  dropTables,
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
const seed = async (numOfRecords) => {
  try {
    await connect();
    await dropExistingTables();
    await createTables();
    for(let i = 1; i <= numOfRecords; i++) {
      let { similarItemsQuery, descriptionQuery, infoQuery, configurationQuery, productQuery } = pgRecord(i);
      await client.query(similarItemsQuery);
      await client.query(descriptionQuery);
      await client.query(infoQuery)
      await client.query(configurationQuery);
      await client.query(productQuery);
    }
    await disconnect();    
  } catch (error) {
    console.log(error)
    await disconnect()
  }
}

seed(100);