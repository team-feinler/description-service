//config
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../', '../', '.env')});

// couchdb connection
const url = `http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984`
const nano = require('nano')(url);
const { log } = console;

// record converter
const { couchDBRecord } = require('./utils');

// for convenience
const { db } = nano;

// DESTROY DB
const clear = async (name) => {
  try {
    //attempt to destroy, if err log err
    await db.destroy(name);
    log(`${name} has been destroyed`);
  } catch (error) {
    if (error.statusCode === 404) {
      log(error.message)
    } else {
      throw error;
    }
  }
}

// CREATE DB
const create = async (name) => {
  try {
    await db.create(name);
    log(`${name} has been created`)
  } catch (error) {
    throw error;
  }
}

// INSERT TOTAL RECORDS BY BATCH
const seed = async (name, total = 10000000, batch = 1000) => {
  const timestamp = Date.now();
  let current = 1;
  try {
    // reset db
    await clear(name);
    await create(name);
    const DB = nano.use(name);
    //make buffer for insert batches
    let documentBuffer = [];
    let count = 0;
    // iterate up to total
    for (let i = 1; i <= total; i++) {
      documentBuffer.push(couchDBRecord(i));
      current = i;
      count++;
      // insert if count reaches batch size or total is reached and there is remainder
      if(count === batch || (i === total && batch !== 0)) {
        await DB.bulk({ docs: documentBuffer });
        count = 0;
        documentBuffer = [];
      }
    }
    log(`Approximate time: ${(Date.now() - timestamp) / 1000}`);
  } catch (error) {
    log(`Error: record ${current} @ ${(Date.now() - timestamp) / 1000} seconds`);
    // log(error.statusCode, error.message );
    log(error)

  }
}

// GET COUNT OF DB
const getCount = async (name) => {
  try {
    let { doc_count } = await db.get(name);
    log(`${ doc_count } documents added to ${name}`);
  } catch (error) {
    log(error.status, error.message);
  }
}

// ACCEPT ARGS FROM COMMAND LINE
const runSeed = async () => {
  const [,,command, name, total, batch] = process.argv;
  try {
    if(!name) throw new Error();
    switch(command){
      case '--clear': 
        await clear(name)
          .catch(err => log(err.statusCode, err.message));
        break;
      case '--create':
        await create(name);
        break;
      case '--seed':
        let isValidTotal = !isNaN(parseInt(total)) ? parseInt(total) : undefined
        let isValidBatch = !isNaN(parseInt(batch)) ? parseInt(batch) : undefined
        await seed(name, isValidTotal, isValidBatch)
          .then(() => getCount(name));
        break;
      default:
        throw new Error();
    }
  } catch (error) {
    log(`
      to destroy the database NAME=name of database(string)
        node seed.js --clear NAME
      to seed database NAME=name of database(string) with TOTAL=total number of records(integer) and BATCH=number of records per batch(integer)
        node seed.js --seed NAME TOTAL BATCH 
    `);
  }
};

runSeed();

