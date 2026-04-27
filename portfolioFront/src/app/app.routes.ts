import { Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/Home.component';
import { NotFoundComponent } from './pages/NotFound/NotFound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
