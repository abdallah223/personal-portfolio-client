import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ProjectsService } from '../projects/services/products.service';
import { ProfileService } from '../../services/profile.service';
import { Project, Profile } from 'shared';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private projectsSvc = inject(ProjectsService);
  private profileSvc = inject(ProfileService);
  projectsError = false;
  profileError = false;
  apiBaseUrl = environment.baseUrl;

  featured$ = this.projectsSvc.getAll().pipe(
    map((projects) => projects.filter((p) => p.featured)),
    catchError(() => {
      this.projectsError = true;
      return of([] as Project[]);
    }),
  );

  profile$ = this.profileSvc.getPublishedProfile().pipe(
    map((profiles) => profiles[0] ?? null),
    catchError(() => {
      this.profileError = true;
      return of(null as Profile | null);
    }),
  );
}
