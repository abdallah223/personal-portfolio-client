import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { catchError, of, switchMap } from 'rxjs';
import { ProjectsService } from '../services/products.service';
import { Project as ProjectModel } from 'shared';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-project',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  private projectService = inject(ProjectsService);
  private route = inject(ActivatedRoute);
  error = false;
  api = environment.baseUrl;

  project$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const slug = params.get('slug') ?? '';
      return this.projectService.getBySlug(slug).pipe(
        catchError(() => {
          this.error = true;
          return of(null as ProjectModel | null);
        }),
      );
    }),
  );
}
