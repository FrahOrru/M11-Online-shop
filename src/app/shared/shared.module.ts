import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    FilterBarComponent,
    TabsComponent,
    SearchInputComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FilterBarComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
