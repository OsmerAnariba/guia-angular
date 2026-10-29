import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { LibroComponent } from './libro/libro';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'libros', component: LibroComponent },
];