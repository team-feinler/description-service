const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);
import 'regenerator-runtime/runtime';

describe('API Endpoints', () => {
  describe('/description/:productId Endpoint', () => {

    test('/description/:productId endpoint will respond with 200 if productId is between 1000-1099', async (done) => {
      const response = await request.get('/description/1001');
      expect(response.status).toBe(200);
      done();
    })

    test('/description/:productId endpoint will respond with 404 if productId is not found', async (done) => {
      const response = await request.get('/description/990');
      expect(response.status).toBe(404);
      done();
    })

    test('/description/:productId endpoint will respond with one item description', async (done) => {
      const res = await request.get('/description/1001');
      expect(res.body.length).toBe(1);
      done();
    })
  })

  describe('/description/multiple Endpoint', () => {
    const productIds = [1001, 1002, 1003];

    test('/description/multiple endpoint will respond with 200 if array of productIds between 1000-1090 are sent', async (done) => {
      const res = await request.post('/description/multiple').send({productIds: productIds});
      expect(res.status).toBe(200);
      done();
    })

    test('/description/multiple endpoint should send back multiple descriptions', async (done) => {
      const res = await request.post('/description/multiple').send(productIds);
      expect(productIds.length).toBe(3);
      done();
    })
  })
})


