import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart.interfece';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/features/services/product.service';
import { LanguageService } from 'src/app/features/services/language.service';

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
  private language: any;

  constructor(private productsService: ProductService, private languageService: LanguageService) {
   }

  ngOnInit(): void {
    this.subsription = this.productsService.cart$.subscribe((cartValues: CartItem[]) => {
      this.cart = cartValues;
      this.calculateTotal();
    })
    this.languageService.language$.subscribe((language) => {
      this.language = language
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

  languageChange() {
    this.languageService.setLanguage(this.language === 'en' ? 'fr' : 'en')
  }

  goToCheckout() {
    this.isProductView = !this.isProductView;
  }
}
