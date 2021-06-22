import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injectable } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { products } from '../products';
import { Router, NavigationExtras } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-check-page-user-entry',
  templateUrl: './check-page-user-entry.component.html',
  styleUrls: ['./check-page-user-entry.component.css']
})
export class CheckPageUserEntryComponent implements OnInit {


  items;
  customerCheckInfo = [];
  // products = products;

  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
    private rest: RestService
  ) {
    this.checkoutForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });
  }

  ngOnInit(): any {
    this.items = this.cartService.getItems();

    this.getCustomerInfoREST();
  }

  onSubmit(costumerData): any {
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
    console.warn('Your order has been submitter', costumerData);
  }


  handleSubmitClick(): any {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        email: this.checkoutForm.value.email,
        firstName: this.checkoutForm.value.firstName,
        lastName: this.checkoutForm.value.lastName,
        address: this.checkoutForm.value.address,
        phoneNumber: this.checkoutForm.value.phoneNumber
      }
    };
    this.router.navigate(['purchase-confirmation'], navigationExtras);
  }


  getCustomerInfoREST(): any {
    this.rest.getCustomerInfo().subscribe(res => {
      this.customerCheckInfo = res;
    });
  }



}

