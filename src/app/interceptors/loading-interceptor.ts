import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading';

// Shows a global loading spinner before every HTTP request
// and hides it when the request completes or errors.
// finalize runs whether the Observable completes OR errors — like a finally block.
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Defer show() to avoid mutating state mid change-detection cycle (NG0100)
  setTimeout(() => loadingService.show());

  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
