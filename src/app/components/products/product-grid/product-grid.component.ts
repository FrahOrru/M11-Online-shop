import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/features/services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit, OnDestroy {
  
  categories: string[] = [];
  pages$: Observable<number> = this.productsService.pages$;
  search: string = '';

  public loading$: Observable<boolean>;
  public products$: Observable<Product[]>;
  public activeTab$: Observable<string>;
  public currentPagination$: Observable<number>;
  
  private subsription = new Subscription;

  constructor(private productsService: ProductService) {
    this.loading$ = productsService.loading$;
    this.products$ = productsService.products$;
    this.activeTab$ = productsService.activeTab$;
    this.currentPagination$ = productsService.currentPage$;
  }

  ngOnInit(): void {
    
    this.productsService.getData();

    this.productsService.categories$.subscribe((val) => {
      if(val.length > 1) this.categories = val;
    })

  }

  searchChange(searchValue: string) {
    this.search = searchValue;
    this.productsService.filterProducts(undefined, searchValue);
  }

  filterByCategory(selectedTab: string) {
   this.productsService.filterProducts(selectedTab);
  }

  changePage(index: number) {
    this.productsService.changePage(index);
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }
}
