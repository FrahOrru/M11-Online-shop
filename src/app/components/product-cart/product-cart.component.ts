import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  public cart: Product[] = [];

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.productsService.cart.subscribe((cartValues: Product[]) => {
      this.cart = cartValues;
    })
  }

}
