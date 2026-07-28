import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Hardcoded for now — replace with real login logic later
  isLoggedIn = true;

}