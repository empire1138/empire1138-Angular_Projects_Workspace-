import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injectable } from '@angular/core';

import { CartService } from '../services/cart.service';

// import { products } from '../products';
import { RestService } from '../services/rest.service';
import { JwtService } from '../services/jwt.service';
import { Products } from '../models/products/products';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items;
  shipping;
  itemsTotal = 0;
  cartTotal = 0;
  shippingTotal = 0;

  constructor(
    private cartService: CartService,
    private jwt: JwtService,
    private rest: RestService
  ) { }



  ngOnInit(): any {
    // this.items = this.cartService.getItems();
    this.getCartItemsREST();

    // this.shipping = this.cartService.getUserShippingChoice();
    this.getShippingChoiceREST();

    // this.items.forEach(items => {
    //   this.itemsTotal += items.productPrice;
    // });

    this.getItemTotalREST();

    // this.shipping.forEach(shipping => {
    //   this.shippingTotal += shipping.shippingPrice;
    // });

    this.getCartTotal();

  }
  cartsTotal(): any {
    this.cartService.gettingUserTotal(this.itemsTotal, this.cartTotal);

  }
  getCartItemsREST() {
    this.rest.getItemsFromCart().subscribe(res => {
      this.items = res;
    });
  }

  getShippingChoiceREST() {
    this.rest.getShippingChoice().subscribe(res => {
      this.shipping = res;
    });
  }

  deleteItemCart(productCode): any {
    this.rest.deleteProductFromCart(productCode);
    this.getCartItemsREST();

  }

  getItemTotalREST(): any {
    this.rest.getItemTotal().subscribe(res => {
      this.itemsTotal = res;
    });
  }

  getCartTotal(){
    this.shippingTotal = this.shipping.shippingPrice;
    console.log(this.shippingTotal);

    this.cartTotal = this.shippingTotal + this.itemsTotal;


  }

}




