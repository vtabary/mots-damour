import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './components/camera/camera.component';
import { ControlsComponent } from './components/controls/controls.component';

const routes: Routes = [
  {
    path: 'controls',
    component: ControlsComponent,
  },
  {
    path: 'camera',
    component: CameraComponent,
  },
  {
    path: '**',
    redirectTo: 'controls',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectRoutingModule {}
