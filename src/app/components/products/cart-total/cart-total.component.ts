import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart.interfece';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/features/services/product.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css']
})
export class CartTotalComponent implements OnInit, OnDestroy {

  public cart: CartItem[] = [];
  public total: number = 0;
  private subsription = new Subscription;
  isProductView = true;

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.subsription = this.productsService.cart$.subscribe((cartValues: CartItem[]) => {
      this.cart = cartValues;
      this.calculateTotal();
    })
  }

  calculateTotal() {
    this.total = 0;
    this.cart.forEach((item) => {
      if(item && item.product.price) {
        let locPrice = (item.product.price * item.quantity)
        this.total += locPrice;
      }
    })
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }
}
