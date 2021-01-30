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



class App extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      item: null
    };
  }

  componentDidMount() {
  }

  render () {
    return (
      <div class="centerCol">
        <div id="itemHeading" class="descriptionCol">
          <div >
            Item Heading
            < ItemHeading heading={this.state.item.itemName} brand={this.state.item.brand}/>
          </div>
        </div>
        <div id="rating" class="descriptionCol">
          <div>
            Rating
          </div>
        </div>
        <div id="answeredQuestions" class="descriptionCol">
          <div>
            Answered Questions
          </div>
        </div>
        <div id="priceDetails" class="descriptionCol">
          <div>
            Item price
          </div>
        </div>
        <div id="colorOptions" class="descriptionCol">
          <div>
            Item color options
            <ItemColorOptions color={this.state.item.itemColor} colorOptions={this.state.item.similarItems} />
          </div>
        </div>
        <div id="configuartion" class="descriptionCol">
          <div>
            Item configuration
            <ItemConfiguration configuration={this.state.item.configuration} />
          </div>
        </div>
        <div id="description" class="descriptionCol">
          <div>
            Item Description
            <ItemDescription description={this.state.item.itemDescription} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;