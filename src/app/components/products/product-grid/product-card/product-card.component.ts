import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;
  @Input() search: string = '';
  
  @Output()
  onAddToChart = new EventEmitter<Product>()

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
  }

  addToCart() {
    this.productsService.addToCart(this.product)
  }

}
