//test:
//return a 200 status at endpoint /description/:productId

//return 404 if product is not found

//should return a descripton of multiple items at /description/multiple
// var sum = (a, b) => {
//   return a + b;
// };

// describe('TESTING JEST', () => {

//   test('should fail', () => {
//     expect(2).toBe(2);
//   });

//   test('test for using jest', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });

const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('API Endpoints', () => {
  // afterAll(done => {
  //   mongoose.connection.close();
  //   done();
  // })

  it('/description/:productId endpoint will respond with 200 when valid productId is included', async (done) => {
    const response = await request.get('/description/1001');
    expect(response.status).toBe(200);
    done();
  })
})


