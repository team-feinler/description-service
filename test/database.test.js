import 'regenerator-runtime/runtime'
// const assert = require('assert');
// const generateData = require('../database/data.js');
// const Description = require('../database/database.js');
// const expect = require('expect.js');
// const app = require('../server/index.js');
// const supertest = require('supertest');
// const request = supertest(app);
// const query = require('../database/query.js');
// const { close } = require('../server/controllers/redis');

xdescribe('GENERATE DATA', () => {

  test('should create an array of 100 records for the database', async (done) => {
    let records = generateData();
    assert.equal(records.length, 100);
    done();
  });

  test('should provide each record with a productId between 1000 and 1099', async (done) => {
    let records = generateData();
    let recordIndex = Math.floor(Math.random() * (1099 - 1000));
    let productId = records[recordIndex].productId;//random productId
    expect(productId).to.be.greaterThan(0);
    expect(productId).to.be.lessThan(101);
    done();
  });
});

xdescribe('DATABASE', () => {
  mongoose.connect('mongodb://localhost/ItemDescription')
  .catch((err) => {
    console.log(err);
  })
  mongoose.connection
    .on('error', console.error.bind(console, 'connection error:'));

    beforeEach((done) => {
      db.collections.descriptions.drop(() => {
        done();
      });
    });

  afterEach(async ()=> {
    await Description.deleteOne({productId: 900});
    done();
  });

  afterAll(async () => {
    mongoose.connection.close();
    done();
  });

});

describe('closes connection', () => {
  afterAll(async () => {
    await close();
    done();
  });
})
