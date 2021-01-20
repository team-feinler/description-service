const mongoose = require('mongoose');
const db = mongoose.connection;
const assert = require('assert');
const generateData = require('../database/data.js');

//need generate Data function
//need collection of description data

//test to see if 100 records are inserted into the DB
describe('Database seed', () => {
  describe('Generate Data', () => {
    it('should create an array of 100 records for the database', () => {
      var numberOfRecords = generateData();
      assert.equal(numberOfRecords.length, 100);
    });
  });
});