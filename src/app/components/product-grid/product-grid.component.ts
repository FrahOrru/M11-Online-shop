import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.productsService.getData().subscribe(
      (response) => {
        console.log(response)
        this.products = response;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
}
