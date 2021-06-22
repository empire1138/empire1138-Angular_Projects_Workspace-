import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styleUrls: ['./purchase-confirmation.component.css']
})
export class PurchaseConfirmationComponent implements OnInit {

  userEntires: any;
  itemsTotal: any;
  cartsTotal: any;
  items: any[];
  shipping: any[];


  constructor(private route: ActivatedRoute, private cartService: CartService) {
    this.route.queryParams.subscribe(params => {
      this.userEntires = params;
    });
  }

  ngOnInit(): void {

    this.itemsTotal = this.cartService.returnItemTotal();
    this.cartsTotal = this.cartService.returnCartTotal();
    this.items = this.cartService.getItems();
    this.shipping = this.cartService.getUserShippingChoice();

  }

}
