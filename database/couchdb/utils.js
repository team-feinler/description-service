const faker = require('faker');
const md5 = require('md5');
const { log } = console;
exports.couchDBRecord = (index, range) => {
  let descriptions = [];
  let similarItems = [];
  let configurations = [];
  let paragraphs = Math.floor(Math.random()* 4) + 1;
  let trackItems = {};
  for (let i = 1; i <= paragraphs; i++) {
    descriptions.push(faker.lorem.paragraph());
    configurations.push(faker.commerce.productAdjective())
    let similarItem = Math.floor(Math.random() * (range - 1)) + 1;
    if(similarItem !== index && !trackItems[index]) {
      trackItems[index] = true;
      similarItems.push(md5(similarItem));
    }
  }
  return {
    _id: md5(index),
    productId: index,
    itemName: faker.commerce.productName(),
    itemDescription: descriptions,
    itemColor: faker.commerce.color(),
    similarItems: similarItems,
    configuration: configurations,
    brand: faker.commerce.productName(),
    isPrimeFreeOneDay: faker.random.boolean(),
    isFreeDelivery: faker.random.boolean()
  }
}

