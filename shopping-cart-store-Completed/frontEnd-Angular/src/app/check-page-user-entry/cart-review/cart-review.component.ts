import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-cart-review',
  templateUrl: './cart-review.component.html',
  styleUrls: ['./cart-review.component.css']
})
export class CartReviewComponent implements OnInit {
  
  

  constructor(
    private cartService: CartService,
    private rest: RestService
    ) { }

  itemsTotal;
  cartsTotal;
  items;
  shipping;

  customerCheckInfo;
  ngOnInit(  ): any {

    // this.itemsTotal = this.cartService.returnItemTotal();
    
    this.cartsTotal = this.cartService.returnCartTotal();


    // this.items = this.cartService.getItems();
    // this.shipping = this.cartService.getUserShippingChoice();
    this.getCartItemsREST();
    this.getShippingChoiceREST();
    this.getItemTotalREST();
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
  
  getItemTotalREST(): any {
    this.rest.getItemTotal().subscribe(res => {
      this.itemsTotal = res;
    });
  }

  

}

