import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit, OnDestroy {
  
  categories: string[] = ['All'];
  search: string = '';

  public loading$: Observable<boolean>;
  public products$: Observable<Product[]>;
  private subsription = new Subscription;

  constructor(private productsService: ProductService) {
    this.loading$ = productsService.loading$;
    this.products$ = productsService.products$;
  }

  ngOnInit(): void {
    this.productsService.getData();

    this.subsription = this.productsService.products$.subscribe((value) => {
      if(value) {
        value.map((product) => {
          if(!this.categories.some((cat) => cat === product.category)) {
            this.categories.push(product.category);
          }
        })
      }
    });
  }

  searchChange(searchValue: string) {
    this.search = searchValue;
    this.productsService.filterProducts(undefined, searchValue);
  }

  filterByCategory(selectedTab: string) {
   this.productsService.filterProducts(selectedTab);
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }
}
