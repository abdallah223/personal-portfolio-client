import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProfileService } from '../../core/services/profile.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.css',
})
export class ProfileEdit implements OnInit {
  private profileService = inject(AdminProfileService);
  private toast = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);
  private formBuilder = inject(FormBuilder);

  fetchLoading = true;
  loading = false;
  error = '';
  saved = false;

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    headline: ['', Validators.required],
    about: ['', Validators.required],
    location: ['', Validators.required],
    status: ['draft' as 'draft' | 'published'],
    socials: this.formBuilder.group({
      github: [''],
      linkedin: [''],
      email: ['', Validators.email],
      website: [''],
    }),
  });

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (profiles) => {
        const profile = profiles[0];
        if (profile) {
          this.form.patchValue({
            name: profile.name,
            headline: profile.headline,
            about: profile.about,
            location: profile.location,
            status: profile.status,
            socials: {
              github: profile.socials?.github ?? '',
              linkedin: profile.socials?.linkedin ?? '',
              email: profile.socials?.email ?? '',
              website: profile.socials?.website ?? '',
            },
          });
        }
        this.form.markAsPristine();
        this.fetchLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load profile.';
        this.fetchLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  get profileForm() {
    return this.form.controls;
  }
  get socials() {
    return (this.form.get('socials') as FormGroup).controls;
  }

  submit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.error = 'Please fix the errors below before saving.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.saved = false;
    this.form.disable();

    const { socials, ...rest } = this.form.getRawValue();

    this.profileService.updateProfile({ ...rest, socials }).subscribe({
      next: () => {
        this.toast.show('Profile updated.');
        this.loading = false;
        this.saved = true;
        this.form.markAsPristine();
        this.form.enable();
        this.cdr.detectChanges();
        setTimeout(() => {
          this.saved = false;
          this.cdr.detectChanges();
        }, 3000);
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to update profile.';
        this.loading = false;
        this.form.enable();
        this.cdr.detectChanges();
      },
    });
  }
}
