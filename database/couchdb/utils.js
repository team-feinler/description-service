const { generateData } = require('../data.js');
const md5 = require('md5');

exports.couchDBRecord = (index) => {
  let [original] = generateData(index, index);
  let { id, ...record } = original;
  record._id = md5(id);
  record.similarItems = record.similarItems.map(item => md5(item));
  return record;
}

