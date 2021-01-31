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



class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      item: exampleData
    };
  }

  componentDidMount() {
    //render random item between 1000-1099
    let randomId = Math.floor(Math.random() * (1099 - 1000 + 1) + 1000);
    axios.get(`/description/${randomId}`)
      .then((response) => {
        let itemData = response.data[0];
        this.setState({
          item: itemData
        });
      });

  }

  render () {
    return (
      <div class="centerCol">
        <div id="itemHeading" class="descriptionCol">
          <div >
            < ItemHeading heading={this.state.item.itemName} brand={this.state.item.brand}/>
          </div>
        </div>
        <div id="rating" class="descriptionCol">
          <div>
            <Rating numOfRating={this.state.item.ratings} />
          </div>
        </div>
        <div id="answeredQuestions" class="descriptionCol">
          <div>
            <AnsweredQuestions numOfAnswers={this.state.item.answeredQuestions}/>
          </div>
        </div>
        <div id="priceDetails" class="descriptionCol">
          <div>
            <Price price={this.state.item.price} />
          </div>
        </div>
        <div id="colorOptions" class="descriptionCol">
          <div>
            <ItemColorOptions color={this.state.item.itemColor} similarItems={this.state.item.similarItems} />
          </div>
        </div>
        <div id="configuartion" class="descriptionCol">
          <div>
            <ItemConfiguration configuration={this.state.item.configuration} />
          </div>
        </div>
        <div id="description" class="descriptionCol">
          <div>
            <ItemDescription description={this.state.item.itemDescription} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;