const faker = require('faker');
const md5 = require('md5');

const DESCRIPTION = 'description';
const INFO = 'info';
const SIMILARITEMS = 'similarItems';
const CONFIGURATION = 'configuration';

// configure objects for bulk insert
/**
 
  {
    create: create table query
    drop: drop table query
    insert: insertion query
    record: function to generate record. passed index and total args. return string with quoted values, seperated by commas
    postInsert: run after all records are inserted(key constraints etc)
    preInsert: run after table made before records inserted

  }
 */

exports.products = {
  create: `create table if not exists products(id varchar(32) not null,description varchar(32),info varchar(32), configuration varchar(32),similarItems varchar(32), PRIMARY KEY(id) );`,
  drop: `drop table if exists products;`,
  insert: `INSERT INTO products(id, description, info, similarItems, configuration) VALUES`,
  record: (index) => [`'${md5(index)}'`,`'${md5(index + DESCRIPTION)}'`,`'${md5(index + INFO)}'`,`'${md5(index + SIMILARITEMS)}'`,`'${md5(index + CONFIGURATION)}'`].join(','),
  postInsert: [
    `
      ALTER TABLE products ADD CONSTRAINT fk_info FOREIGN KEY(info) REFERENCES info(id);
      ALTER TABLE products ADD CONSTRAINT fk_description FOREIGN KEY(description) REFERENCES descriptions(id);
      ALTER TABLE products ADD CONSTRAINT fk_configuration FOREIGN KEY(configuration) REFERENCES configurations(id);
      ALTER TABLE products ADD CONSTRAINT fk_similarItems FOREIGN KEY(similarItems) REFERENCES similarItems(id);
    `
  ],
  preInsert: []
}

exports.descriptions = {
  create:  `
    create table if not exists descriptions(
      id varchar(32) not null,
      product varchar(32),
      itemDescription json,
      PRIMARY KEY(id)
    );
  `,
  insert: 'INSERT INTO descriptions(id, product, itemDescription) VALUES',
  record: index => {
    const description = [];
    const count = Math.floor(Math.random() * 5) + 1
    for (let i = 0; i <= count; i++) {
      description.push(faker.lorem.paragraph());
    }
    return [`'${md5(index + DESCRIPTION)}'`,`'${md5(index)}'`, `'${JSON.stringify(description)}'`].join(',');
  },
  drop: 'drop table if exists descriptions;'
}

exports.configurations = {
  create:  `
    create table if not exists configurations(
      id varchar(32) not null,
      product varchar(32),
      configuration json,
      PRIMARY KEY(id)
    )
  `,
  insert: 'INSERT INTO configurations(id, product, configuration) VALUES',
  record: index => {
    const configuration = [];
    const count = Math.floor(Math.random() * 5) + 1
    for (let i = 0; i <= count; i++) {
      configuration.push(faker.commerce.productAdjective());
    }
    return [`'${md5(index + CONFIGURATION)}'`,`'${md5(index)}'`, `'${JSON.stringify(configuration)}'`].join(',');
  },
  drop: 'drop table if exists configurations;'  
}

exports.info = {
  create: `
    create table if not exists info(
      id varchar(32) not null,
      product varchar(32),
      itemName text,
      itemColor text,
      brand text,
      isPrimeFreeOneDay boolean,
      isFreeDelivery boolean,
      PRIMARY KEY(id)
    )
  `,
  insert: 'INSERT INTO info(id, product, itemName, itemColor, brand, isPrimeFreeOneDay, isFreeDelivery) VALUES',
  drop: 'drop table if exists info;',
  record: index => {
    const configuration = [];
    const count = Math.floor(Math.random() * 5) + 1
    for (let i = 0; i <= count; i++) {
      configuration.push(faker.commerce.productAdjective());
    }
    return [
      `'${ md5(index + INFO) }'`,
      `'${ md5(index) }'`,
      `'${ faker.commerce.productName() }'`,
      `'${ faker.commerce.color() }'`,
      `'${ faker.commerce.productName() }'`,
      `'${ faker.random.boolean() }'`,
      `'${ faker.random.boolean() }'`
    ].join(',');
  }
}

exports.similarItems = {
  create: `
    create table if not exists similarItems(
      id varchar(32) not null,
      product varchar(32),
      similarItems json,
      PRIMARY KEY(id)
    );
  `,
  insert: `INSERT INTO similarItems (id, product, similarItems) VALUES`,
  drop: 'drop table if exists similarItems;',
  record: (index, total) => {
    let limit = Math.floor(Math.random() * 5);
    let items = [];
    for (let i = 0; i < limit; i++) {
      let item = Math.floor(Math.random() * (total - 1)) + 1;
      items.push(md5(item));
    }
    return [
      `'${md5(index + SIMILARITEMS)}'`,
      `'${md5(index)}'`,
      `'${JSON.stringify(items)}'`
    ].join(',');
  }
}

