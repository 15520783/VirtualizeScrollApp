import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'message/:id',
    loadComponent: () =>
      import('./components/view-message/view-message.page').then(
        (m) => m.ViewMessagePage
      ),
  },
  {
    path: '',
    redirectTo: 'scroll-tab-data',
    pathMatch: 'full',
  },
  {
    path: 'scroll-tab-data',
    loadComponent: () =>
      import('./pages/scroll-tab-data/scroll-tab-data.page').then(
        (m) => m.ScrollTabDataPage
      ),
  },
];
