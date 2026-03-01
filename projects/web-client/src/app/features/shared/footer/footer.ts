import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AsyncPipe } from '@angular/common';
import { Profile } from 'shared';
import { map } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [AsyncPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private profileService = inject(ProfileService);
  profile$ = this.profileService
    .getPublishedProfile()
    .pipe(map((profiles: Profile[]) => profiles[0] ?? null));
}
