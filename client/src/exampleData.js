import { LoremIpsum } from "lorem-ipsum";
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


var exampleData = [];
//product Ids from 1000-1100

//FUNCTIONS
//need function to create a sentence for the name of item + color at end
var createItemName = (color) => {
  var itemName = null;
  //an item name should contain between 5 - 10 words + a color
  //randomize a number between 5 - 10 words
  var numberOfWords = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
  //need to call lorem.generateSentences(1) + color
  itemName = lorem.generateWords(numberOfWords) + `, ${color}`;
  //return item Name
  return itemName;
};

//need function to use lorem ipsum to generate 5-7 paragraphs for description
var createItemDescription = () => {
  //create an array
  var itemDescription = [];
  //create random number between 4-7
  var max = Math.floor(Math.random() * (7-4 + 1)) + 4;
  //set max number = to random number above
  //loop from 0 to max number
  for (var i = 0; i <= max; i++) {
    //for each loop call lorem ipsum to create one paragraph
    var paragraph = lorem.generateParagraphs(1);
    //push paragraph into array
    itemDescription.push(paragraph);
  }
  //return array
  return itemDescription;
};
//need function to select random brand from a list of speakers
//Jungle, Desert,  or rainforest around the world

//need function to select either true or false randomly

//Generate data function
var generateData = () => {
  //returns an array of 100 different items of data

  //creat an array of three colors
  var colorOptions = ['black', 'white', 'gray'];
  var colorIndex = 0;
  //loop through numbers starting at 1000 to 1100
  for (var i = 1000; i <= 1100; i++) {
    //create a new item object
    var newItemObject = {};
    //set property of product id of object equal to i
    newItemObject.productId = i;
    //set property "color" of either black, white, gray in that order
    newItemObject.color = colorOptions[colorIndex];
    //if colorIndex = 2 then reset to 0
    //if last item was black then next item is white and if white then gray and if gray then black
    if (colorIndex === 2) {
      colorIndex = 0;
    } else {
      colorIndex++;
    }
    //set property name, call createItemName passing in color
    newItemObject.itemName = createItemName(newItemObject.color);
    //set property description by calling
    newItemObject.itemDescription = createItemDescription();

    //set property available colors

    //set property Brand

    //set property
    //push new item object into exampleData
    exampleData.push(newItemObject);
  }
};


// var test = createItemDescription();
exampleData = lorem.generateParagraphs(6);

export default exampleData;
