import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  //A DIRECTIVE IS AN HELPER FUNCTION FOR YOUR COMPONENT OR DOM ELEMENTS

  @Input() appHover: string = 'red';

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(this.element.nativeElement);
  }
  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = this.color;
    this.renderer.setStyle(
      //the element
      this.element.nativeElement,
      //the property
      'backgroundColor',
      //the value
      this.appHover
    );
  }

  //@HostListener is used to listen for any event happening on your parent element
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    );
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'white'
    );
  }
}
