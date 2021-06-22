import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { Observable, throwError } from 'rxjs';
import { Shipping } from '../models/shipping/shipping';



@Injectable({
  providedIn: 'root'
})
export class CartService {



  constructor(private http: HttpClient) {
   }

  items = [];

  shippingChoice = [];




  itemsTotal;
  cartsTotal;


  addToCart(product) {
    this.items.push(product);

  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  userShippingChoice(shipping) {
    this.shippingChoice.push(shipping);
  }

  getUserShippingChoice() {
    return this.shippingChoice;
  }

  getShippingInfoObj(): Observable<Shipping[]>{
    return this.http.get<Shipping[]>('/assets/shipping.json');
  }

  gettingUserTotal(itemsTotal, cartsTotal){
    this.itemsTotal = itemsTotal;
    this.cartsTotal = cartsTotal;
  }
  returnItemTotal(){
    console.log(this.itemsTotal);
    return this.itemsTotal;
  }

  returnCartTotal(){
    return this.cartsTotal;
  }
}
