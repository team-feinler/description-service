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
import {Route} from 'react-router-dom';




class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      productId: null,
      itemDescription: null,
      brand: null,
      itemColor: null,
      similarItems: null,
      itemConfiguration: null,
      itemName: null,
      isPrimeFreeOneDay: null,
      isFreeDelivery: null,
      rating: 12233,
      price: null,
      answeredQuestions: 457,
      productInventory: null
    };
    this.handleColorBoxClick = this.handleColorBoxClick.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  componentDidMount() {
    //render random item between 1000-1099
    let url = window.location.href;
    let productId = url.split('/')[3] || 1000;
    axios.get(`/description/${productId}`)
      .then((response) => {
        let itemData = response.data[0];
        console.log(itemData);
        this.setState({
          productId: itemData.productId,
          itemDescription: itemData.itemDescription,
          brand: itemData.brand,
          itemColor: itemData.itemColor,
          similarItems: itemData.similarItems,
          itemConfiguration: itemData.configuration,
          itemName: itemData.itemName,
          isPrimeFreeOneDay: itemData.isPrimeFreeOneDay,
          isFreeDelivery: itemData.isFreeDelivery,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    //get the price of the product
    this.getPrice(productId);
  }

  getPrice(id) {
    let productId = id;
    axios.get(`http://localhost:4003/priceandinventory/id/${productId}`)
      .then((response) => {
        let itemPrice = response.data[0].price;
        let inventory = response.data[0].inventory;

        this.setState({
          price: itemPrice,
          productInventory: inventory
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
        window.location = `/${itemData.productId}`;
        this.setState({
          productId: itemData.productId,
          itemDescription: itemData.itemDescription,
          brand: itemData.brand,
          itemColor: itemData.itemColor,
          similarItems: itemData.similarItems,
          itemConfiguration: itemData.configuration,
          itemName: itemData.itemName,
          isPrimeFreeOneDay: itemData.isPrimeFreeOneDay,
          isFreeDelivery: itemData.isFreeDelivery
        })
          .catch((error) => {
            console.log(error);
          });
      });
    this.getPrice(productId);
  }

  render () {
    if (this.state.productId === null) {
      return (
        <div>
          <div><strong>BAD REQUEST - INVALID URL</strong></div>
          <br></br>
          <div>HTTP ERROR 400. The request URL is invalid</div>
        </div>
      );
    }

    return (
      <DescriptionContainer>
        <div>
          <HeadingBox>
            < ItemHeading heading={this.state.itemName} brand={this.state.brand} color={this.state.itemColor}/>
          </HeadingBox>
          <RatingAndAnswersBox>
            <RatingBox>
              <Rating numOfRating={this.state.ratings} />
            </RatingBox>
            <AnswersBox>
              <AnsweredQuestions numOfAnswers={this.state.answeredQuestions}/>
            </AnswersBox>
          </RatingAndAnswersBox>
          <PriceBox>
            <ItemPriceDetails inventory={this.state.productInventory} price={this.state.price} brand={this.state.brand}/>
          </PriceBox>
          <ColorOptionBox>
            <ItemColorOptions color={this.state.itemColor} similarItems={this.state.similarItems} handleColorBoxClick={this.handleColorBoxClick} />
          </ColorOptionBox>
          <ConfigOptionBox>
            <ItemConfiguration configuration={this.state.itemConfiguration} />
          </ConfigOptionBox>
          <DescriptionBox>
            <ItemDescription description={this.state.itemDescription} />
          </DescriptionBox>
        </div>
      </DescriptionContainer>
    );
  }
}
export default App;