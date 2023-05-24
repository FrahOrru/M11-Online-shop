import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable()
export class ProductService {
  private apiUrl = '../../assets/json/products.json';

  public cart: Observable<Product[]>;
  private cartSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.cart = this.cartSubject.asObservable();
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addToCart(newProduct: Product) {
    let tmpCart: Product[] = [...this.cartSubject.getValue(), newProduct]
    this.cartSubject.next(tmpCart)
  }

  deleteFromCart(id: number) {
    let tmpCart: Product[] = [...this.cartSubject.getValue()]
    tmpCart = tmpCart.filter(item => item.id !== id)
    this.cartSubject.next(tmpCart)
  }
}