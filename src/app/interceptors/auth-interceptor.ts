import { HttpInterceptorFn } from '@angular/common/http';

// Clones every outgoing request and attaches a Bearer token in the Authorization header.
// In a real app, retrieve the token from AuthService instead of hardcoding it.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });
  return next(authReq);
};
