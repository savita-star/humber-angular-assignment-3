import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[creditCard]',
})
export class CreditCardDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
