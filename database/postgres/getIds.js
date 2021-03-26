const md5 = require('md5');

const keys = ['description', 'info', 'similarItems', 'configuration'];
let [,,input] = process.argv;
input = parseInt(input);
console.log(`table ids for ${input}`)
console.log('products - ' + md5(input));
keys.forEach(key => {
  console.log(`${key} - ${ md5(input + key)}`);
});

/*

primary record is md5(index), supporting are md5(index + 'respective key')
to get the ids for each table based on the index they were inserted run:
node getIds.js [Number]

*/


