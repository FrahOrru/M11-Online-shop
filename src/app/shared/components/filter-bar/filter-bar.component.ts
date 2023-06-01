import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input()
  categories: string[] = [];
  @Input()
  activeTab: string = '';
  

  @Output()
  searchChange = new EventEmitter();

  @Output()
  categorySelected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  inputStateChange(value: string) {
    this.searchChange.emit(value);
  }

  tabClicked(tab: string) {
    this.categorySelected.emit(tab);
  }

}
