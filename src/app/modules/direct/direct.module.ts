import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CameraComponent } from './components/camera/camera.component';
import { DirectRoutingModule } from './direct-routing.module';
import { ControlsComponent } from './components/controls/controls.component';
import { CSSFilterDirective } from './directives/cssfilter/cssfilter.directive';

@NgModule({
  declarations: [CameraComponent, ControlsComponent, CSSFilterDirective],
  imports: [CommonModule, DirectRoutingModule, ReactiveFormsModule],
})
export class DirectModule {}
