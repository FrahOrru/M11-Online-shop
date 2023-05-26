import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { CartItem } from '../interfaces/cart.interfece';

@Injectable()
export class ProductService {
  private apiUrl = '../../assets/json/products.json';

  public cart: Observable<CartItem[]>;
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor(private http: HttpClient) {
    this.cart = this.cartSubject.asObservable();
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addToCart(newProduct: Product) {
    let quantity = (this.cartSubject.getValue().find((cart) => cart.product.id === newProduct.id)?.quantity ?? 0) + 1;
    let tmpCart: CartItem[] = [];
    console.log(this.cartSubject.getValue().some((item) => item.product.id === newProduct.id))
    if(!this.cartSubject.getValue().some((item) => item.product.id === newProduct.id)) {
      tmpCart = [...this.cartSubject.getValue(),
        { product: newProduct,
          quantity}
      ]
    } else {
      tmpCart = this.cartSubject.getValue().map((item) => {
        if(item.product.id === newProduct.id) {
          return {
            ...item,
            quantity: quantity
          }
        }
          return item;
      })
    }
    this.cartSubject.next(tmpCart);
  }

  deleteFromCart(id: number) {
    let tmpCart: CartItem[] = [...this.cartSubject.getValue()]
    tmpCart = tmpCart.filter(item => item.product.id !== id)
    this.cartSubject.next(tmpCart);
  }
}