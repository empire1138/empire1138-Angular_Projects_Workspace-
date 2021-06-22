import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../services/cart.service';
import { Shipping } from '../models/shipping/shipping';
import { RestService } from '../services/rest.service';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {


  shipping = [];

  shippingInfo: Shipping[] = [];



  constructor(
    private cartService: CartService,
    private rest: RestService
    ) { }

  userShippingMethod(shipping): any {
    // this.cartService.userShippingChoice(shipping);
    this.rest.pickedShipping(shipping);
    window.alert('Selected a Shipping Method');

  }



  ngOnInit(): any {
    // this.cartService.getShippingInfoObj().subscribe((shippingData) => {
    //   this.shippingInfo = shippingData;
    // });

    this.rest.getShippingInfo().subscribe((shippingData) => {
      this.shippingInfo = shippingData;
    })
    }

  }




