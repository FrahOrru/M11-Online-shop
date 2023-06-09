import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { ProductService } from './services/product.service';
import { LanguageService } from './services/language.service';



@NgModule({
  declarations: [
    HighlightDirective,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    ProductService,
    LanguageService
  ],
  exports: [
    HighlightDirective
  ]
})
export class FeaturesModule { }
