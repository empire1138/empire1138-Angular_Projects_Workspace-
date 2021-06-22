import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products/products';
import { RestService } from '../services/rest.service';
// import { products } from '../products';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  items = [];
  // products = products;
  productInfo: Products[] = [];

  constructor(private restService: RestService) { }

  ngOnInit(): any {
    this.restService.getProducts().subscribe((productData) => {
      this.productInfo = productData;
    });

  }

  share(): void {
    window.alert('The product has been shared');


  }


  onNotify(): void {
    window.alert('You will be notified when the product goes on sale');
  }
}
