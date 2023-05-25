import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input()
  product!: Product;

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
  }

  onDeleteFromCart() {
    console.log('yeyee')
    this.productsService.deleteFromCart(this.product.id);
  }

}
