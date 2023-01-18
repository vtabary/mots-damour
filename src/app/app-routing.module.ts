import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'direct',
    loadChildren: () =>
      import('./modules/direct/direct.module').then((m) => m.DirectModule),
  },
  {
    path: '**',
    redirectTo: 'direct',
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
