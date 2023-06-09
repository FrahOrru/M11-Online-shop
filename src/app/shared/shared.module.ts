import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ButtonComponent } from './components/button/button.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';



@NgModule({
  declarations: [
    FilterBarComponent,
    TabsComponent,
    SearchInputComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
    ButtonComponent,
    NotFoundComponent,
    ToggleSwitchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FilterBarComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
    ButtonComponent,
    NotFoundComponent,
    ToggleSwitchComponent
  ]
})
export class SharedModule { }
