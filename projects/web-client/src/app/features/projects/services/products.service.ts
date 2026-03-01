import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, Profile } from 'shared';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`);
  }

  getBySlug(slug: string) {
    return this.http.get<Project>(`${environment.apiUrl}/projects/${slug}`);
  }
}
