import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminProjectsService } from '../../core/services/projects.service';
import { ToastService } from '../../core/services/toast.service';
import { Project } from 'shared';
import { environment } from 'projects/admin-client/src/environments/environment';

@Component({
  selector: 'app-project-list',
  imports: [RouterLink],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  private projectService = inject(AdminProjectsService);
  private toast = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);
  readonly BASE = environment.baseUrl;

  projects: Project[] = [];
  loading = true;
  error = '';
  deletingSlug: string | null = null;

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.projectService.getAll().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load projects.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  delete(slug: string) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    this.deletingSlug = slug;
    this.projectService.delete(slug).subscribe({
      next: () => {
        this.projects = this.projects.filter((p) => p.slug !== slug);
        this.toast.show('Project deleted.');
        this.deletingSlug = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.toast.show('Failed to delete project.', 'error');
        this.deletingSlug = null;
        this.cdr.detectChanges();
      },
    });
  }
}
