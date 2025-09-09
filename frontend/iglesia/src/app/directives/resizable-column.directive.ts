import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizableColumn]',
  standalone: true
})
export class ResizableColumnDirective {
  private startX = 0;
  private startWidth = 0;
  private resizer!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const style = getComputedStyle(this.el.nativeElement);
    if (style.position === 'static') {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }

    this.resizer = this.renderer.createElement('span');
    this.renderer.addClass(this.resizer, 'resizer');
    this.renderer.appendChild(this.el.nativeElement, this.resizer);

    this.renderer.listen(this.resizer, 'mousedown', (event: MouseEvent) => {
      event.preventDefault();
      this.startX = event.pageX;
      this.startWidth = this.el.nativeElement.offsetWidth;

      const mouseMove = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.onMouseMove(e));
      const mouseUp = this.renderer.listen('document', 'mouseup', () => {
        mouseMove();
        mouseUp();
      });
    });
  }

  private onMouseMove(event: MouseEvent) {
    const width = this.startWidth + (event.pageX - this.startX);
    this.renderer.setStyle(this.el.nativeElement, 'width', `${width}px`);
  }
}