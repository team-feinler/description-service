const { generateData } = require('../data.js')
const md5 = require('md5');
// raw queries for seed script
exports.dropTables = `
drop table if exists products;
drop table if exists descriptions;
drop table if exists info;
drop table if exists configurations;
drop table if exists similarItems;
`;

exports.productTable = `
  create table if not exists products(
    id varchar(32) not null,
    itemName text,
    PRIMARY KEY(id)
  )
`;


exports.descriptionsTable = `
  create table if not exists descriptions(
    id varchar(32) not null,
    itemDescription json,
    PRIMARY KEY(id)
  )
`;

exports.infoTable = `
  create table if not exists info(
    id varchar(32) not null,
    itemColor text,
    brand text,
    isPrimeFreeOneDay boolean,
    isFreeDelivery boolean,
    PRIMARY KEY(id)
  )
`

exports.configurationsTable = `
  create table if not exists configurations(
    id varchar(32) not null,
    configuration json,
    PRIMARY KEY(id)
  )
`;

exports.similarItemsTable = `
  create table if not exists similarItems(
    id varchar(32) not null,
    similarItems json,
    PRIMARY KEY(id)
  )
`;

exports.pgRecord = (id) => {
  const [record] = generateData(id, id);
  const productId = md5(id);
  record.similarItems = record.similarItems.map(item => md5(item));
  
  let similarItemsValues = [ productId, JSON.stringify(record.similarItems)];

  const infoValues = [ productId, record.itemColor, record.brand, record.isPrimeFreeOneDay, record.isFreeDelivery ];

  const configurationValues = [productId, JSON.stringify(record.configuration)]

  let descriptionValues = [productId, JSON.stringify(record.itemDescription)];

  let productValues = [productId, record.itemName];

  return {
    similarItemsValues,
    descriptionValues,
    productValues,
    configurationValues,
    infoValues
  }
};