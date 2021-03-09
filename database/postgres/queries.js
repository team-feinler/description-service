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
    info varchar(32),
    description varchar(32),
    configuration varchar(32),
    similarItems varchar(32),
    PRIMARY KEY(id),
    CONSTRAINT fk_info FOREIGN KEY(info) REFERENCES info(id),
    CONSTRAINT fk_description FOREIGN KEY(description) REFERENCES descriptions(id),
    CONSTRAINT fk_configuration FOREIGN KEY(configuration) REFERENCES configurations(id),
    CONSTRAINT fk_similar_items FOREIGN KEY(similarItems) references similarItems(id)
  )
`;

exports.infoTable = `
  create table if not exists info(
    id varchar(32) not null,
    productId varchar(32),
    itemName text,
    itemColor text,
    brand text,
    isPrimeFreeOneDay boolean,
    isFreeDelivery boolean,
    PRIMARY KEY(id)
  )
`;

exports.descriptionsTable = `
  create table if not exists descriptions(
    id varchar(32) not null,
    productId varchar(32),
    itemDescription json,
    PRIMARY KEY(id)
  )
`;

exports.configurationsTable = `
  create table if not exists configurations(
    id varchar(32) not null,
    productId varchar(32),
    configuration json,
    PRIMARY KEY(id)
  )
`;

exports.similarItemsTable = `
  create table if not exists similarItems(
    id varchar(32) not null,
    productId varchar(32),
    similarItems json,
    PRIMARY KEY(id)
  )
`;

exports.pgRecord = (id) => {
  const [record] = generateData(id, id);
  const productId = md5(id);
  record.similarItems = record.similarItems.map(item => md5(item));
  let ids = {
    similarItems: md5(id + 'similar'),
    description: md5(id + 'description'),
    config: md5(id + 'configuration'),
    info: md5(id + 'info')
  }
  let similarItemsQuery = {
    text: 'INSERT INTO similarItems (id, productId, similarItems) VALUES($1, $2, $3);',
    values: [ ids.similarItems, productId, JSON.stringify(record.similarItems)]
  };

  let descriptionQuery = {
    text: 'INSERT INTO descriptions (id, productId, itemDescription) VALUES($1, $2, $3);',
    values: [ids.description, productId, JSON.stringify(record.itemDescription)]
  };

  let configurationQuery = {
    text: 'INSERT INTO configurations (id, productId, configuration) VALUES($1, $2, $3);',
    values: [ids.config, productId, JSON.stringify(record.configuration)]
  };

  const infoParams = [ record.itemName, record.itemColor, record.brand, record.isPrimeFreeOneDay, record.isFreeDelivery ];

  let infoQuery = {
    text: 'INSERT INTO info (id, productId, itemName, itemColor, brand, isPrimeFreeOneDay, isFreeDelivery) VALUES($1, $2, $3, $4, $5, $6, $7);',
    values: [ids.info, productId, ...infoParams]
  };

  let productQuery = {
    text: 'INSERT INTO products(id, info, description, configuration, similarItems) VALUES($1, $2, $3, $4, $5);',
    values: [productId, ids.info, ids.description, ids.config, ids.similarItems]
  };

  return {
    similarItemsQuery,
    descriptionQuery,
    configurationQuery,
    infoQuery,
    productQuery
  }
};