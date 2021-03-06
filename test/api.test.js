const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);
const Description = require('../database/database.js');
import 'regenerator-runtime/runtime';

describe('API Endpoints', () => {

  let productId;

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('/description/:productId Endpoint', () => {
    test('/description/:productId endpoint will respond with 200 if productId is between 1-99', async (done) => {
      const response = await request.get('/description/1');
      expect(response.status).toBe(200);
      done();
    })

    test('/description/:productId endpoint will respond with 404 if productId is not found', async (done) => {
      const response = await request.get('/description/199');
      expect(response.status).toBe(404);
      done();
    })

    test('/description/:productId endpoint will respond with one item description', async (done) => {
      const res = await request.get('/description/1');
      expect(res.body.length).toBe(1);
      done();
    })
  })

  describe('/descriptions/multiple Endpoint', () => {
    test('/descriptions/multiple endpoint will respond with 200 if array of productIds between 1000-1090 are sent', async (done) => {
      const res = await request.get('/descriptions/multiple/?1=1&2=2&3=3');
      expect(res.status).toBe(200);
      done();
    })

    test('/descriptions/multiple endpoint should send back multiple descriptions', async (done) => {
      const res = await request.get('/descriptions/multiple/?1=1&2=2&3=3')
      expect(res.body.length).toBe(3);
      done();
    })

    test('POST to /descriptions/new should create a new document', async (done) => {
      const res = await request.post('/description/new');
      const count = await Description.count({});
      productId = count;
      expect(res.body.productId).toBe(productId);
      done();
    })

    test('PUT should update document', async (done) => {
      let str = 'This has been update in test'
      await request.put(`/description/${productId}`).send({ itemColor: str});
      let description = await request.get(`/description/${productId}`);
      expect(description.body[0].itemColor).toBe(str);
      done();
    })

    test('DELETE should remove a document', async (done) => {
      const path = `/description/${productId}`;
      await request.delete(path);
      let description = await request.get(path);
      expect(description.body.productId).toBe(undefined);
      done();
    })
    
  })
})


