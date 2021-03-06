import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);

  totalQuatity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem) {

  // check if we already have the item in out cart
  let alreadyExistingInCart: boolean = false;
  let existingCartItem: CartItem = undefined!;

  if (this.cartItems.length > 0) {
    // find the item in the cart based on item id

    existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id);
  
      // check if we found it
      alreadyExistingInCart = (existingCartItem != undefined);
    }

    if (alreadyExistingInCart) {
      // increment the quantity
      existingCartItem.quantity ++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();

  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publicsh the new values .. all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuatity.next(totalQuantityValue);

    // log cart data just for debbuging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);


  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
      console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
      console.log('-------');
    }
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    // get index of item in the array
    const intemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);

    // if found, remove the item from array at given index
    if(intemIndex > -1) {
      this.cartItems.splice(intemIndex, 1);

      this.computeCartTotals();
    }
  }
  

}
