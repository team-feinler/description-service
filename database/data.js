const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

//FUNCTIONS

//function to create a sentence for the name of item + color at end
var createItemName = () => {
  var itemName = null;
  //an item name should contain between 5 - 10 words + a color
  var numberOfWords = Math.floor(Math.random() * (10 - 5)) + 5;
  itemName = lorem.generateWords(numberOfWords);
  //return item Name
  return itemName;
};

//function to use lorem ipsum to generate 5-7 paragraphs for description
var createItemDescription = () => {
  var itemDescription = [];
  //create random number between 4-7 so that the descriptions for each item vary in length
  var max = Math.floor(Math.random() * (7 - 4)) + 4;
  for (var i = 0; i <= max; i++) {
    //for each loop call lorem ipsum to create one paragraph
    var paragraph = lorem.generateParagraphs(1);
    //push paragraph into array
    itemDescription.push(paragraph);
  }
  //return array
  return itemDescription;
};

//function to select random brand from a list of speakers
var getBrand = (num) => {
  //input: a number between 1000- 1100
  //output: a string
  //brands "Nile", "Mississippi", "Thames", "Ganges", "Danube", "Yangtze"
  if (num < 1015) {
    return 'Yangtze';
  }
  if (num < 1030) {
    return 'Mississippi';
  }
  if (num < 1045) {
    return 'Thames';
  }
  if (num < 1060) {
    return 'Ganges';
  }
  if (num < 1075) {
    return 'Danube';
  }
  return 'Nile';
};

//function to select either true or false randomly
var generateBooleanValue = () => {
  var num = Math.round(Math.random());
  if (num === 0) {
    return false;
  } else {
    return true;
  }
};

//Create Configuration data
var createConfiguration = () => {
  //return an array of 4 values (4 configuration options)
  var configArray = [];
  //each value can be a few words to no words
  //randomize numbers between 1- 5 to get a number of configurations for the item
  var numOfConfigs = Math.floor(Math.random() * (5 - 1)) + 1;

  for (var i = 0; i < numOfConfigs; i++) {
    //randomize a number between 1-4  to get a number of words for each config
    var numOfWords = Math.floor(Math.random() * (4 - 1)) + 1;
    var config = lorem.generateWords(numOfWords);
    configArray.push(config);
  }
  return configArray;
};

//function to keep track of similar items based on color
var getAvailableColors = (id, color) => {
  //input is a color and id
  var arrayOfProductIds = [];
  var idOne = null;
  var idTwo = null;
  //if color is black then add 1 to firstId and add 2 to secondId
  if (color === 'Black') {
    idOne = id + 1;
    idTwo = id + 2;
    arrayOfProductIds.push(idOne, idTwo);
  }
  //if color is white then add 1 to firstId and subtract 1 from secondId
  if (color === 'White') {
    idOne = id - 1;
    idTwo = id + 1;
    arrayOfProductIds.push(idOne, idTwo);
  }
  //if color is gray than subract 1 and 2 to id and pass into array
  if (color === 'Gray') {
    idOne = id - 2;
    idTwo = id - 1;
    arrayOfProductIds.push(idOne, idTwo);
  }
  //output is an array of the product Ids for the products with a similar name but different id
  return arrayOfProductIds;
};

//Generate data function
var generateData = () => {
  //returns an array of 100 different items of data
  //DATA of 100 different items
  var data = [];
  //product Ids from 1000-1100
  //creat an array of color options
  var colorOptions = ['Black', 'White', 'Gray'];
  var colorIndex = 0;

  //need some items to have the same name and only have a different color in the name
  var name = null;
  var nameCount = 0;
  //need the similar items except for different colors to have the same description
  var description = null;
  var configuration = null;
  //loop through numbers starting at 1000 to 1100
  for (var i = 1000; i < 1100; i++) {
    var newItemObject = {};
    newItemObject.productId = i;
    //set property "color" of either black, white, gray in that order
    newItemObject.itemColor = colorOptions[colorIndex];
    newItemObject.configuration = createConfiguration();
    //everyItem with same name but different color needs the description to be the same
    //everyItem with the same name but different color also needs the same configuration options
    if (nameCount === 1) {
      newItemObject.itemName = name;
      newItemObject.itemDescription = description;
      newItemObject.configuration = configuration;
    }
    if (nameCount === 0) {
      name = createItemName();
      newItemObject.itemName = name;
      description = createItemDescription();
      newItemObject.itemDescription = description;
      configuration = createConfiguration();
      newItemObject.configuration = configuration;
    }
    if (nameCount === 2) {
      newItemObject.itemName = name;
      newItemObject.itemDescription = description;
      newItemObject.configuration = configuration;
      nameCount = 0;
    } else {
      nameCount++;
    }

    // if (i === 1099) {
    //   newItemObject.similarItems = [1098, 1097];
    // }
    //if colorIndex = 2 then reset to 0
    //if last item was black then next item is white and if white then gray and if gray then black
    if (colorIndex === 2) {
      colorIndex = 0;
    } else {
      colorIndex++;
    }
    newItemObject.brand = getBrand(i);
    //set property isPrimeFreeOneDay to either true or false
    newItemObject.isPrimeFreeOneDay = generateBooleanValue();
    //set property isFreeDelivery to either true or false
    newItemObject.isFreeDelivery = generateBooleanValue();
    data.push(newItemObject);
  }
  return data;
};

module.exports = generateData;


