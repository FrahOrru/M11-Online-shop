import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input()
  tabs: string[] = [];
  @Input()
  activeTab: string = '';

  @Output()
  tabClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  tabClicked(tab: string) {
    this.tabClick.emit(tab);
  }

}
