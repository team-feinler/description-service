import React from 'react';
import { PriceText, BlueText, PriceSavedText, WithDealPriceText, ListPriceText } from '../style.js';


const ItemPriceDetails = (props) => (
  <div>
    <PriceText>List Price: </PriceText> <ListPriceText>$59</ListPriceText>
    <br></br>
    <PriceText>With Deal:</PriceText> <WithDealPriceText>$39</WithDealPriceText>  Prime Free Delivery
    <br></br>
    <PriceText>You Save:</PriceText> <PriceSavedText>$20 (33%)</PriceSavedText>
    <div>Order it now.</div>
    <div>FREE Delivery <b>Jan 29 - Feb 3</b> for Prime members</div>
    <BlueText>Details</BlueText>
    <div>Ships from and sold by {props.brand}.com Services LLC.</div>
  </div>
);

export default ItemPriceDetails;