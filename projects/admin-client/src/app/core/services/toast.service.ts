import { Injectable } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast: Toast | null = null;
  private timer: any;

  show(message: string, type: 'success' | 'error' = 'success') {
    clearTimeout(this.timer);
    this.toast = { message, type };
    this.timer = setTimeout(() => {
      this.toast = null;
    }, 3500);
  }
}
