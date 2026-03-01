import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './features/auth/login';
import { ProjectList } from './features/projects/project-list';
import { ProjectForm } from './features/projects/project-form/project-form';
import { ProfileEdit } from './features/profile/profile-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'projects', component: ProjectList, canActivate: [authGuard] },
  { path: 'projects/new', component: ProjectForm, canActivate: [authGuard] },
  { path: 'projects/:slug/edit', component: ProjectForm, canActivate: [authGuard] },
  { path: 'profile', component: ProfileEdit, canActivate: [authGuard] },
];
