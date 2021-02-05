import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ItemHeading from './itemHeading.jsx';
import AnsweredQuestions from './answeredQuestions.jsx';
import ItemColorOptions from './itemColorOptions.jsx';
import ItemConfiguration from './itemConfiguration.jsx';
import ItemDescription from './itemDescription.jsx';
import ItemPriceDetails from './itemPriceDetails.jsx';
import Rating from './rating.jsx';
import Price from './itemPriceDetails.jsx';
import exampleData from '../exampleData.js';
import { Wrapper } from '../style.js';
import { DescriptionContainer } from '../style.js';
import { HeadingBox, RatingAndAnswersBox, PriceBox, ColorOptionBox, ConfigOptionBox, DescriptionBox, RatingBox, AnswersBox } from '../style.js';




class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      item: exampleData,
      price: 20
    };
    this.handleColorBoxClick = this.handleColorBoxClick.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  componentDidMount() {
    //render random item between 1000-1099
    let randomId = Math.floor(Math.random() * (1099 - 1000 + 1) + 1000);
    axios.get(`http://localhost:4004/description/${randomId}`)
      .then((response) => {
        let itemData = response.data[0];
        this.setState({
          item: itemData
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.getPrice(randomId);
  }

  getPrice(id) {
    let productId = id;
    axios.get(`http://localhost:4003/priceandinventory/id/${productId}`)
      .then((response) => {
        console.log(response);
        let itemPrice = response.data[0].price;
        this.setState({
          price: itemPrice
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //handle color box click
  handleColorBoxClick (id) {
    //will make call to /description/${productId}
    let productId = id;
    axios.get(`http://localhost:4004/description/${productId}`)
      .then((response) => {
        let itemData = response.data[0];
        this.setState({
          item: itemData
        })
          .catch((error) => {
            console.log(error);
          });
      });
  }

  render () {
    return (
      <DescriptionContainer>
        <div class="centerCol">
          <HeadingBox>
            <div id="itemHeading" class="descriptionCol">
              <div >
                < ItemHeading heading={this.state.item.itemName} brand={this.state.item.brand} color={this.state.item.itemColor}/>
              </div>
            </div>
          </HeadingBox>
          <RatingAndAnswersBox>
            <RatingBox>
              <div id="rating" class="descriptionCol">
                <Rating numOfRating={this.state.item.ratings} />
              </div>
            </RatingBox>
            <AnswersBox>
              <div id="answeredQuestions" class="descriptionCol">
                <AnsweredQuestions numOfAnswers={this.state.item.answeredQuestions}/>
              </div>
            </AnswersBox>
          </RatingAndAnswersBox>
          <PriceBox>
            <div id="priceDetails" class="descriptionCol">
              <div>
                <ItemPriceDetails price={this.state.price} brand={this.state.item.brand}/>
              </div>
            </div>
          </PriceBox>
          <ColorOptionBox>
            <div id="colorOptions" class="descriptionCol">
              <div>
                <ItemColorOptions color={this.state.item.itemColor} similarItems={this.state.item.similarItems} handleColorBoxClick={this.handleColorBoxClick} />
              </div>
            </div>
          </ColorOptionBox>
          <ConfigOptionBox>
            <div id="configuartion" class="descriptionCol">
              <div>
                <ItemConfiguration configuration={this.state.item.configuration} />
              </div>
            </div>
          </ConfigOptionBox>
          <DescriptionBox>
            <div id="description" class="descriptionCol">
              <div>
                <ItemDescription description={this.state.item.itemDescription} />
              </div>
            </div>
          </DescriptionBox>
        </div>
      </DescriptionContainer>
    );
  }
}
export default App;