import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnDestroy {

  input = new FormControl('');

  subscriptions = new Subscription()

  @Output()
  onInputStateChange = new EventEmitter();

  constructor() {
    this.subscriptions = this.input.valueChanges.subscribe((value) => {
      if(value) {
        this.onInputStateChange.emit(value);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
