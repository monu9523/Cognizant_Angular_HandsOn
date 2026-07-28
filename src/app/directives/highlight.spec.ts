import { HighlightDirective } from './highlight';
import { ElementRef } from '@angular/core';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const mockEl = { nativeElement: { style: {} } } as ElementRef;
    const directive = new HighlightDirective(mockEl);
    expect(directive).toBeTruthy();
  });
});
