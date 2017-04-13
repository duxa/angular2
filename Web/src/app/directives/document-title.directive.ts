import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[document-title]'
})
export class DocumentTitleDirective implements OnInit, OnDestroy {
  private prevDocumentTitle: string;

  constructor (private elementRef: ElementRef) { }

  public ngOnInit () {
    this.prevDocumentTitle = document.title;
    document.title = this.elementRef.nativeElement.textContent;
  }

  public ngOnDestroy () {
    document.title = this.prevDocumentTitle;
  }
}
