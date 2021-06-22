import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { products } from '../products';
import { CartService } from '../services/cart.service';

import { RestService } from '../services/rest.service';
import { Products } from '../models/products/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Products;



  constructor(private route: ActivatedRoute, private cartService: CartService, private restService: RestService) { }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.restService.addProductToCart(product, this.product.productCode);
    window.alert('Your product has been added to the cart');
    
  }

  ngOnInit(): any {
    // // First get the product id from the current route.
    // const productIdFromRoute = this.route.snapshot.paramMap.get('productCode');
    // // Find the product that correspond with the id provided in route.
    // this.product = products.find(product => {
    //   return product.productCode === Number(productIdFromRoute);
    // });

    this.getProductByCode();
  }

 

  getProductByCode(): any {
    const productCode = +this.route.snapshot.paramMap.get('productCode');
    this.restService.getProductsByCode(productCode).subscribe(product => this.product = product);
  }

  // addItemToCartREST(product, productCode): any {
  //   this.restService.addProductToCart(product, productCode).subscribe(product => this.product = product);
  // }

  addItemToCartREST():any{
    this.restService.addProductToCart(this.product, this.product.productCode).then(res =>{
      if (res.error) {
        console.log('error', res);
      } else {
        console.log('worked', res);
      }
    });
  }



}


