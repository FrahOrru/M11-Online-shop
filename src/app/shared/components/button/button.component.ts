import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input()
  isDisabled: boolean = false;

  @Input()
  text: string = '';

  @Input()
  isBlack: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
