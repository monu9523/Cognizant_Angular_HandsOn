import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  @Input()
  appHighlight = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  mouseenter(): void {
    this.el.nativeElement.style.background = this.appHighlight;
  }

  @HostListener('mouseleave')
  mouseleave(): void {
    this.el.nativeElement.style.background = '';
  }

}