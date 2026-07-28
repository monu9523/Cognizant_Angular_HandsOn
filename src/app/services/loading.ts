import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // BehaviorSubject holds the current loading state and emits to all subscribers immediately
  isLoading$ = new BehaviorSubject<boolean>(false);

  show(): void { this.isLoading$.next(true); }

  hide(): void { this.isLoading$.next(false); }

}
