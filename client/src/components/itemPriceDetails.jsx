import React from 'react';
import { PriceText, BlueText } from '../style.js';


const ItemPriceDetails = (props) => (
  <div>
    <PriceText>List Price: </PriceText> {59}
    <br></br>
    <PriceText>With Deal:</PriceText> {39} Prime Free Delivery
    <br></br>
    <PriceText>You Save:</PriceText> {20}
    <div>Order it now.</div>
    <div>FREE Delivery <b>Jan 29 - Feb 3</b> for Prime members</div>
    <BlueText>Details</BlueText>
    <div>Ships from and sold by {props.brand}.com Services LLC.</div>
  </div>
);

export default ItemPriceDetails;