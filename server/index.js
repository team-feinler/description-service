const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const { getProduct, updateProduct, genUpdate, insertProduct, genInsert, deleteProduct, getProductBatch, genBatch, hashProductIds } = require('./controllers/postgres.js');

const { getCached } = require('./controllers/redis.js');

const { errorHandler, hashParam } = require('./controllers/utils.js');

const app = express();

//setup middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

// setup up static requests
app.get('*.js', function(req, res, next) {
  if (req.header('Accept-Encoding').includes('br')) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  }
  next();
});
app.use(express.static(__dirname + '/../public'));
app.use('/:id', express.static(__dirname + '../../public'));



// hash param and add to req
// RUD controllers
app.use('/description/:productId', hashParam);
app.route('/description/:productId')
  .get(getCached, getProduct)
  .put(genUpdate, updateProduct)
  .delete(deleteProduct);

// C controller
app.route('/descriptions/new')
  .post(genInsert, insertProduct);

//get multiple item descriptions
app.use(hashProductIds);
app.get('/descriptions/multiple', genBatch, getProductBatch);
app.use(errorHandler);

module.exports = app;