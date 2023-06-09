import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProductService } from '../features/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuardGuard implements CanActivate {
  constructor(private productService: ProductService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.productService.cart$.pipe(
        map(elements => {
          if (elements.length > 0) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        })
      );
  }
  
}
