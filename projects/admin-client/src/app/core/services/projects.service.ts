import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from 'shared';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

const BASE = `${environment.apiUrl}projects`;

@Injectable({ providedIn: 'root' })
export class AdminProjectsService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  getAll() {
    return this.http.get<Project[]>(BASE);
  }

  getBySlug(slug: string) {
    return this.http.get<Project>(`${BASE}/${slug}`);
  }

  create(formData: FormData) {
    return this.http.post<Project>(BASE, formData);
  }

  update(slug: string, formData: FormData) {
    return this.http.patch<Project>(`${BASE}/${slug}`, formData);
  }

  delete(slug: string) {
    return this.http.delete<{ message: string }>(`${BASE}/${slug}`);
  }
}
