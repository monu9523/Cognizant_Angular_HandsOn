import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification';

// Globally intercepts HTTP errors so components don't need individual error handling.
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Unauthorized — redirect to home
        router.navigate(['/']);
        notificationService.message = 'Session expired. Please log in again.';
      } else if (err.status === 500) {
        // Server error — show global notification
        notificationService.message = 'Server error. Please try again later.';
      } else {
        notificationService.message = `Error: ${err.message}`;
      }
      return throwError(() => err);
    })
  );
};
