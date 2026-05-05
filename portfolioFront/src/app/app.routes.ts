import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/Home/Home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'not-found', 
    loadComponent: () => import('./pages/NotFound/NotFound.component').then(m => m.NotFoundComponent) 
  },
  { path: '**', redirectTo: 'not-found' },
];
