import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Projects } from './features/projects/projects';
import { Project } from './features/projects/project/project';
import { About } from './features/about/about';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'projects', component: Projects },
  { path: 'projects/:slug', component: Project },
  { path: 'about', component: About },
];
