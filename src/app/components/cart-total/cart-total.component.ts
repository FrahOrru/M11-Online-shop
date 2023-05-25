import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css']
})
export class CartTotalComponent implements OnInit {

  public cart: Product[] = [];
  public total: number = 0;

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.productsService.cart.subscribe((cartValues: Product[]) => {
      this.cart = cartValues;
      this.calculateTotal();
    })
  }

  calculateTotal() {
    this.total = 0;
    this.cart.forEach((item) => {
      if(item && item.price) {
        this.total += item.price;
      }
    })
  }
}
