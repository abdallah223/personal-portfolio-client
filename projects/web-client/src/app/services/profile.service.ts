import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'shared';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getPublishedProfile() {
    return this.http.get<Profile[]>(`${environment.apiUrl}/profile`);
  }
}
