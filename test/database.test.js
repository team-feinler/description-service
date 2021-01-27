const mongoose = require('mongoose');
const db = mongoose.connection;
const assert = require('assert');
const generateData = require('../database/data.js');
const Description = require('../database/database.js');
const expect = require('expect.js');

import 'regenerator-runtime/runtime'

const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('GENERATE DATA', () => {

  test('should create an array of 100 records for the database', async (done) => {
    let records = generateData();
    assert.equal(records.length, 100);
    done();
  });

  test('should provide each record with a productId between 1000 and 1100', async (done) => {
    let records = generateData();
    let recordIndex = Math.floor(Math.random() * (1100 - 1000));
    let productId = records[recordIndex].productId;//random productId
    expect(productId).to.be.greaterThan(999);
    expect(productId).to.be.lessThan(1100);
    done();
  });
});

describe('SEED DATABASE', () => {
  mongoose.connect('mongodb://localhost/ItemDescription')
  .catch((err) => {
    console.log(err);
  })
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

  afterEach((done) => {
    db.collections.descriptions.drop(() => {
      done();
    });
  });

  test('should insert a record into the database', (done) => {
    const item = new Description({productId: 1050});
    item.save()
      .then(() => {
        assert(!item.isNew);
        done();
      });
  });
});
