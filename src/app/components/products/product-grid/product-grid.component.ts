import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  private subsription = new Subscription;

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.subsription = this.productsService.getData().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }
}
