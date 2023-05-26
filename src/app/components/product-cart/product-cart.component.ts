import { Component, OnInit, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart.interfece';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input()
  cartItem!: CartItem;

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
  }

  onDeleteFromCart() {
    this.productsService.deleteFromCart(this.cartItem.product.id);
  }

}
