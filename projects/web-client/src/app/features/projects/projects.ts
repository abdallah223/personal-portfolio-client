import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ProjectsService } from './services/products.service';
import { Project } from 'shared';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-projects',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private projectsService = inject(ProjectsService);
  api = environment.baseUrl;
  error = false;

  projects$ = this.projectsService.getAll().pipe(
    catchError(() => {
      this.error = true;
      return of([] as Project[]);
    }),
  );
}
