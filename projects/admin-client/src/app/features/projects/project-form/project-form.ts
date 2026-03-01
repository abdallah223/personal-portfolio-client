import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminProjectsService } from '../../../core/services/projects.service';
import { ToastService } from '../../../core/services/toast.service';
import { Project } from 'shared';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-project-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm implements OnInit {
  private svc = inject(AdminProjectsService);
  private toast = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  isEdit = false;
  editSlug = '';
  loading = false;
  fetchLoading = false;
  error = '';

  title = '';
  slug = '';
  summary = '';
  problem = '';
  solution = '';
  stack = '';
  impact = '';
  liveLink = '';
  repoLink = '';
  featured = false;
  status: 'draft' | 'published' = 'draft';
  coverImageFile: File | null = null;
  existingImageUrl = '';
  previewUrl = '';

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) this.loadProject(slug);
  }
  private loadProject(slug: string) {
    this.isEdit = true;
    this.editSlug = slug;
    this.fetchLoading = true;
    this.svc.getBySlug(slug).subscribe({
      next: (project: Project) => {
        this.title = project.title;
        this.slug = project.slug;
        this.summary = project.summary;
        this.problem = project.problem ?? '';
        this.solution = project.solution ?? '';
        this.stack = (project.stack ?? []).join(', ');
        this.impact = (project.impact ?? []).join('\n');
        this.liveLink = project.links?.live ?? '';
        this.repoLink = project.links?.repo ?? '';
        this.featured = project.featured;
        this.status = project.status;
        this.existingImageUrl = project.coverImageUrl
          ? environment.baseUrl + project.coverImageUrl
          : '';
        this.previewUrl = this.existingImageUrl;
        this.fetchLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load project.';
        this.fetchLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.coverImageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  buildFormData(): FormData {
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('slug', this.slug);
    fd.append('summary', this.summary);
    fd.append('problem', this.problem);
    fd.append('solution', this.solution);

    const stackArr = this.stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    stackArr.forEach((s) => fd.append('stack', s));

    const impactArr = this.impact
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    impactArr.forEach((s) => fd.append('impact', s));

    fd.append('links[live]', this.liveLink);
    fd.append('links[repo]', this.repoLink);
    fd.append('featured', String(this.featured));
    fd.append('status', this.status);
    if (this.coverImageFile) fd.append('coverImage', this.coverImageFile);
    return fd;
  }

  submit() {
    if (!this.title || !this.slug || !this.summary) {
      this.error = 'Title, slug and summary are required.';
      return;
    }
    this.loading = true;
    this.error = '';
    const fd = this.buildFormData();

    const req$ = this.isEdit ? this.svc.update(this.editSlug, fd) : this.svc.create(fd);

    req$.subscribe({
      next: () => {
        this.toast.show(this.isEdit ? 'Project updated.' : 'Project created.');
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Something went wrong.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
