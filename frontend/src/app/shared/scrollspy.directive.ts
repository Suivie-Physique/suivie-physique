import { Directive, Input, EventEmitter, Inject, Output, ElementRef, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appScrollspy]',
})
export class ScrollspyDirective {
  @Input() public spiedTags: string[] = [];
  @Output() public sectionChange = new EventEmitter<string>();
  private currentSection: string | undefined;

  // tslint:disable-next-line: variable-name
  constructor(private _el: ElementRef, @Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', ['$event'])
  /**
   * Window scroll method
   */
  onScroll() {
    const spiedTags = ['SECTION']; // Update this array with the tags you want to spy on
    const children = Array.from(this._el.nativeElement.querySelectorAll(spiedTags.join(',')));
    const scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    const parentOffset = this.document.documentElement.offsetTop || 0;

    let currentSection = '';

    for (let i = children.length - 1; i >= 0; i--) {
      const element = children[i] as HTMLElement;
      if (element.offsetTop - parentOffset <= scrollTop) {
        currentSection = element.id;
        break;
      }
    }

    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
    }
  }
}
