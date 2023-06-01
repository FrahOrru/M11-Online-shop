import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') searchText!: string;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.searchText) {
      this.highlightText();
    }
  }

  private highlightText() {
    const text = this.el.nativeElement.innerText;
    const regex = new RegExp(this.searchText, 'gi');
    const highlightedText = text.replace(regex, (match: any) => `<span class="highlight">${match}</span>`);
    this.el.nativeElement.innerHTML = highlightedText;
  }
}