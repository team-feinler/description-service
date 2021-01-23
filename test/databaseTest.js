const mongoose = require('mongoose');
const db = mongoose.connection;
const assert = require('assert');
const generateData = require('../database/data.js');
const Description = require('../database/database.js');
const expect = require('expect.js');


//need generate Data function
//need collection of description data
//test to see if 100 records are inserted into the DB
describe('GENERATE DATA', () => {

  it('should create an array of 100 records for the database', () => {
    let records = generateData();
    assert.equal(records.length, 100);
  });

  it('should provide each record with a productId between 1000 and 1100', () => {
    let records = generateData();
    let recordIndex = Math.floor(Math.random() * (1100 - 1000));
    let productId = records[recordIndex].productId;//random productId
    expect(productId).to.be.greaterThan(999);
    expect(productId).to.be.lessThan(1101);
  });
});

describe('SEED DATABASE', () => {
  mongoose.connect('mongodb://localhost/ItemDescription');
  mongoose.connection
    .on('error', console.error.bind(console, 'connection error:'))
    .once('open', function () {
      console.log('CONNECTED TO MONGO FOR TESTING');
    });

  beforeEach((done) => {
    db.collections.descriptions.drop(() => {
      done();
    });
  });

  it('should insert a record into the database', (done) => {
    const item = new Description({productId: 1000});
    item.save()
      .then(() => {
        assert(!item.isNew);
        done();
      });
  });
});
