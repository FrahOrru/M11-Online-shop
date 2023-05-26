import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/products/product-grid/product-card/product-card.component';
import { ProductGridComponent } from './components/products/product-grid/product-grid.component';
import { ProductCartComponent } from './components/products/cart-total/product-cart/product-cart.component';
import { CartTotalComponent } from './components/products/cart-total/cart-total.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductGridComponent,
    ProductCartComponent,
    CartTotalComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
