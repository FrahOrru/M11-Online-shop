import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CheckoutComponent } from './components/products/checkout/checkout.component';
import { ProductGridComponent } from './components/products/product-grid/product-grid.component';
import { SuccessComponent } from './components/products/success/success.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { CheckoutGuardGuard } from './guards/checkout-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [CheckoutGuardGuard]
      },
      {
        path: '',
        component: ProductGridComponent
      }
    ]
  },
  {
    path: 'success',
    component: SuccessComponent
  }, {
    path: '**',
    component: NotFoundComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
