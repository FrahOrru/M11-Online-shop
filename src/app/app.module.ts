import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/products/product-grid/product-card/product-card.component';
import { ProductGridComponent } from './components/products/product-grid/product-grid.component';
import { ProductCartComponent } from './components/products/cart-total/product-cart/product-cart.component';
import { CartTotalComponent } from './components/products/cart-total/cart-total.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { FeaturesModule } from './features/features.module';
import { RouterModule } from '@angular/router';

import { APP_CONFIG_TOKEN, APP_CONFIG } from '../config';
import { ProductRoutingModule } from './product-routing.module';
import { CheckoutComponent } from './components/products/checkout/checkout.component';
import { SuccessComponent } from './components/products/success/success.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './features/services/product.service';

function initializeApp(productsData: ProductService) {
  return () => productsData.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductGridComponent,
    ProductCartComponent,
    CartTotalComponent,
    ProductsComponent,
    CheckoutComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    FeaturesModule,
    RouterModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ProductService],
      multi: true,
    },
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
