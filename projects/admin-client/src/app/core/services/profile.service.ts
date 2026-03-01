import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'shared';
import { environment } from '../../../environments/environment';

const BASE = `${environment.apiUrl}profile`;

@Injectable({ providedIn: 'root' })
export class AdminProfileService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<Profile[]>(BASE);
  }

  updateProfile(body: Partial<Profile>) {
    return this.http.patch<Profile>(BASE, body);
  }
}
