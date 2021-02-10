import React from 'react';
import { PriceText, BlueText, PriceSavedText, WithDealPriceText, ListPriceText } from '../style.js';
import moment from 'moment';


const ItemPriceDetails = (props) => {
  let available = true;
  if (props.inventory === 0) {
    available = false;
  }

  const currentDate = moment().format('MMM Do');
  const futureDate = moment().add(5, 'days').format('MMM Do');

  return (
    <div>
      <PriceText>List Price: </PriceText> <ListPriceText>${Math.floor(props.price + 10).toFixed(2)}</ListPriceText>
      <br></br>
      <PriceText>With Deal:</PriceText> <WithDealPriceText>${props.price}</WithDealPriceText>  Prime Free Delivery
      <br></br>
      <PriceText>You Save:</PriceText> <PriceSavedText>${10.00.toFixed(2)} ({Math.floor((((props.price + 10) - (props.price)) / (props.price + 10)) * 100)}%) </PriceSavedText>
      <div>
        {available ? 'Order it now' : 'Not currently in stock'}
      </div>
      <br></br>
      <br></br>
      <div>FREE Delivery <b>{currentDate} - {futureDate}</b> for Prime members</div>
      <BlueText>Details</BlueText>
      <br></br>
      <div>Ships from and sold by {props.brand}.com Services LLC.</div>
    </div>
  );
};

export default ItemPriceDetails;