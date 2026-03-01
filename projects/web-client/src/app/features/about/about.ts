import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, map, of } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Profile } from 'shared';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private profileService = inject(ProfileService);
  error = false;

  profile$ = this.profileService.getPublishedProfile().pipe(
    map((profiles) => profiles[0] ?? null),
    catchError(() => {
      this.error = true;
      return of(null as Profile | null);
    }),
  );
}
