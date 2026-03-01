import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = environment.tokenKey;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return next(req);

  return next(
    req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    }),
  );
};
