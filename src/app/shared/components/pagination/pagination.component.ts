import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
  pages$: Observable<number> = new Observable();

  @Input()
  activePage: number = 1;

  @Output()
  changePagination = new EventEmitter();

  tmpPages: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.pages$.subscribe((val) => {
      this.tmpPages = Array(val).fill([]);
    })
  }

  changePage(index: number) {
    this.changePagination.emit(index)
  }

}
