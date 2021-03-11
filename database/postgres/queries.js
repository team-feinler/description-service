const { generateData } = require('../data.js')
const md5 = require('md5');
const crypto = require('crypto');
// raw queries for seed script
exports.dropTables = `
drop table if exists products;
drop table if exists descriptions;
drop table if exists info;
drop table if exists configurations;
drop table if exists similarItems;
`;

exports.unlogTables = `
ALTER TABLE products SET UNLOGGED;
ALTER TABLE descriptions SET UNLOGGED;
ALTER TABLE info SET UNLOGGED;
ALTER TABLE configurations SET UNLOGGED;
ALTER TABLE similarItems SET UNLOGGED;
`

exports.logTables = `
ALTER TABLE descriptions SET LOGGED;
ALTER TABLE info SET LOGGED;
ALTER TABLE configurations SET LOGGED;
ALTER TABLE similarItems SET LOGGED;
ALTER TABLE products SET LOGGED;
`

exports.productTable = `
  create table if not exists products(
    id varchar(40) not null,
    description varchar(40),
    info varchar(40),
    configuration varchar(40),
    similarItems varchar(40),
    PRIMARY KEY(id)
  )
`;

exports.addForeignKeys = `
ALTER TABLE products ADD CONSTRAINT fk_info FOREIGN KEY(info) REFERENCES info(id);
ALTER TABLE products ADD CONSTRAINT fk_description FOREIGN KEY(description) REFERENCES descriptions(id);
ALTER TABLE products ADD CONSTRAINT fk_configuration FOREIGN KEY(configuration) REFERENCES configurations(id);
ALTER TABLE products ADD CONSTRAINT fk_similarItems FOREIGN KEY(similarItems) REFERENCES similarItems(id);
`

exports.descriptionsTable = `
  create table if not exists descriptions(
    id varchar(40) not null,
    product varchar(40),
    itemDescription json,
    PRIMARY KEY(id)
  )
`;

exports.infoTable = `
  create table if not exists info(
    id varchar(40) not null,
    product varchar(40),
    itemName text,
    itemColor text,
    brand text,
    isPrimeFreeOneDay boolean,
    isFreeDelivery boolean,
    PRIMARY KEY(id)
  )
`

exports.configurationsTable = `
  create table if not exists configurations(
    id varchar(40) not null,
    product varchar(40),
    configuration json,
    PRIMARY KEY(id)
  )
`;

exports.similarItemsTable = `
  create table if not exists similarItems(
    id varchar(40) not null,
    product varchar(40),
    similarItems json,
    PRIMARY KEY(id)
  )
`;

const hash = (data) => crypto.createHash('sha1').update((data).toString()).digest('hex');

exports.pgRecord = (id) => {
  const [record] = generateData(id, id);
  record.similarItems = record.similarItems.map(item => md5(item));

  const productID = hash(id)
  const similarItemsID = hash(id + 'similarItems');
  const infoID = hash(id + 'info');
  const configurationID = hash(id + 'configurations');
  const descriptionID = hash(id + 'descriptions')
  
  const similarItemsValues = [ similarItemsID, productID, JSON.stringify(record.similarItems)];

  const infoValues = [ infoID, productID, record.itemColor, record.brand, record.isPrimeFreeOneDay, record.isFreeDelivery ];

  const configurationValues = [configurationID, productID, JSON.stringify(record.configuration)]

  const descriptionValues = [descriptionID, productID, JSON.stringify(record.itemDescription)];

  const productValues = [productID, descriptionID, infoID, configurationID, similarItemsID];

  return {
    similarItemsValues,
    descriptionValues,
    productValues,
    configurationValues,
    infoValues
  }
};