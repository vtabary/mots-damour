import { Directive, HostBinding, Input } from '@angular/core';

export type IFilter =
  | 'none'
  | 'sepia'
  | 'black-and-white'
  | 'cold'
  | 'tint-magenta';

@Directive({
  selector: '[visualShowCSSFilter]',
})
export class CSSFilterDirective {
  @Input('visualShowCSSFilter')
  public filter: IFilter = 'none';

  @HostBinding('class')
  public get classes(): string {
    return this.filter;
  }
}
