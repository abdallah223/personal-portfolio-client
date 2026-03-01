import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ToastService } from './core/services/toast.service';
import { SideBar } from './features/shared/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  auth = inject(AuthService);
  toastSvc = inject(ToastService);
}
