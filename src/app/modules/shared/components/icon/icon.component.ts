import { Component, Input } from '@angular/core';

@Component({
  selector: 'visual-show-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input()
  public icon?: string;
}
