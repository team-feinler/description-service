const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env')});
//pg setup
const { Client } = require('pg');
const client = new Client();
// convenience
const { log } = console;
const md5 = require('md5');


class BulkInserter {
  constructor() {
    // tables schemas
    this.tables = {
      example: {
        create: `create table if not exists example(id varchar(32) not null,description varchar(32),info varchar(32), configuration varchar(32),similarItems varchar(32), PRIMARY KEY(id) ) `,
        drop: `drop table if exists example;`,
        insert: `INSERT INTO example(id, description, info, similarItems, configuration) VALUES`,
        record: (index) => [`'${md5(id)}'`,`'${md5(id + 'description')}'`,`'${md5(id + 'info')}'`,`'${md5(id + 'similarItems')}'`,`'${md5(id + 'configuration')}'`].join(','),
        postInsert: [],
        preInsert: []
      }
    };
  }
  async connect() {
    await client.connect();
  }
  async disconnect() {
    await client.end();
  }
  // return the beginning of insertQueries 
  getInsert(tableName) {
    this.checkForTable(tableName)
    if(!this.tables[tableName].insert) throw new Error('No insert query has been added');
    return this.tables[tableName].insert;
  }

  // add base query for inserting
  addInsertQuery(tableName, insertQuery) {
    this.checkForTable(tableName);
    this.tables[tableName].insert = insertQuery;
  }

  // add function to generate record
  // this will be passed an index and total number of records to be made
  addGenerator(tableName, generatorFunction) {
    this.checkForTable(tableName);
    this.tables[tableName].record = generatorFunction;
  }

  // retrieve generator
  getGenerator(tableName) {
    this.checkForTable(tableName);
    if (!this.tables[tableName].record) throw new Error('Record generator has not been added');
    else return this.tables[tableName].record;
  }

  //add post insert query
  addPostInsert(tableName, postInsert) {
    this.checkForTable(tableName);
    if(!this.tables[tableName].postInsert) this.tables[tableName].postInsert = [];
    this.tables[tableName].postInsert.push(postInsert)
  }

  //remove all from post insert array
  clearPostInsert(tabelName) {
    this.checkForTable(tableName);
    this.tables[tabeleName].postInsert = [];
  }

  //run post inserts for given table if present
  async runPostInserts(tableName) {
    if(!this.tables[tableName].postInsert) return false;
    else this.tables[tableName].postInsert.forEach( async (query) => {
      await client.query(query);
    })
    log('Post inserts successful')
  }


  //check if table exists
  checkForTable(tableName) {
    if (!this.tables[tableName]) throw new Error('Table does not exist');
  }

  //add a table
  addTable(tableName, config = {}) {
    if(this.tables[tableName]) throw new Error('Table already exists');
    this.tables[tableName] = config;
  }

  //remove a table
  removeTable(tableName) {
    this.checkForTable(tableName);
    delete this.tables[tableName];
    return true;
  }

  // add create query for a table
  addTableCreate(tableName, tableQuery) {
    this.checkForTable(tableName)
    this.tables[tableName].create = tableQuery;
    this.tables[tableName].drop = `drop table if exists ${tableName};`
  }

  // run table create query for a given table
  async createTable(tableName) {
    this.checkForTable(tableName);
    if(!this.tables[tableName].create) throw new Error('Table create query has not been added')
    await client.query(this.tables[tableName].create);
  }

  // run table drop query for a given table
  async dropTable(tableName) {
    this.checkForTable(tableName);
    return client.query(this.tables[tableName].drop);
  }

  //generate a single product and push to this.values;
  async bulkInsert(tableName, total = 10000, batchsize = Math.floor(total / 10)) {
    // make base vars for batch inserts
    let buffer = [];
    let batch = 0;
    let timeStamp = Date.now()
    try {
      // drop and recreate table
      await client.query('BEGIN')
      await this.dropTable(tableName);
      await this.createTable(tableName);

      // get resources from table to build queries
      let generator = this.getGenerator(tableName);
      let query = this.getInsert(tableName);

      // iterate to total and insert at batch size
      for(let i = 1; i <= total; i++) {
        //push generator values to buffer
        if(i % 250000 === 0) log(`+250000 records added to ${tableName} @${(Date.now() - timeStamp) / 1000} seconds`);
        buffer.push(`(${generator(i, total)})`);
        if(buffer.length === batchsize || (i === total && buffer.length > 0)) {
          let batchInsertQuery = `${query}${buffer.join(',')}`;
          await client.query(batchInsertQuery);
          buffer = [];
          batch++;
        }
      }
      await this.runPostInserts(tableName);
      await client.query('COMMIT');
      const endTime = (Date.now() - timeStamp) / 1000
      log('Insert complete')
      log(`Approximate time: ${endTime} seconds`)
    } catch (error) {
      let endTime = Math.floor((timeStamp - Date.now()) / 1000);
      let errorAt = batchsize * batch + buffer.length;
      log(`Error: record #${errorAt} at ${endTime} seconds`);
      log(error.message)
      throw error;

    }
  }
}

exports.bulk = new BulkInserter();


