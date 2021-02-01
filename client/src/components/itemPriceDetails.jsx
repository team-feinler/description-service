import React from 'react';
import { PriceText, BlueText } from '../style.js';


const ItemPriceDetails = (props) => (
  <div>
    <PriceText>List Price:</PriceText>
    <PriceText>With Deal:</PriceText> {props.price}
    <PriceText>You Save:</PriceText>
    <div>Order it now.</div>
    <div>FREE Delivery <b>Jan 29 - Feb 3</b> for Prime members</div>
    <BlueText>Details</BlueText>
    <div>Ships from and sold by {props.brand}.com Services LLC.</div>
  </div>
);

export default ItemPriceDetails;