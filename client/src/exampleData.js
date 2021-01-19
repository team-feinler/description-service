import { LoremIpsum } from "lorem-ipsum";
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


var exampleData = [];
//product Ids from 1000-1100
var test = lorem.generateSentences(1);

//FUNCTIONS

//Generate data function
var generateData = () => {
  //returns an array of 100 different items of data
};

//need function to create a sentence for the name of item + color at end
var createItemName = (color) => {
  var itemName = null;
  //need to call lorem.generateSentences(1) + color

  //return item Name
};

//need function to use lorem ipsum to generate 5-7 paragraphs for description

//need function to select random brand from a list of speakers
//Jungle, Desert,  or rainforest around the world

//need function to select either true or false randomly

export default exampleData;
