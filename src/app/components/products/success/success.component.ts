import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/features/services/product.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private productsService: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.productsService.clearCart();
  }

  backToHome() {
    this.router.navigate(['/']);
  }
}
