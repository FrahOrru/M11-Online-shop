import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    FilterBarComponent,
    TabsComponent,
    SearchInputComponent,
    LoadingSpinnerComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FilterBarComponent,
    LoadingSpinnerComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
